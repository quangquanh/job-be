import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/user.interface';
import { RegisterUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import * as cookieParser from 'cookie-parser';
import { Request, response, Response } from 'express';
import { RolesService } from '../roles/roles.service';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private rolesService: RolesService,
  ) {}

  //username/ pass là 2 tham số thư viện passport nó ném về
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      return 'đéo có user';
    }

    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (!isValid) {
        return 'đéo valid';
      }
      if (isValid === true) {
        const userRole = user.role as unknown as { _id: string; name: string };
        const temp = await this.rolesService.findOne(userRole._id);
        const objUser = {
          ...user.toObject(),
          permissions: temp?.permissions ?? [],
        };
        return objUser;
      }
    }

    return null;
  }

  async getProfile(id: string) {
    return await this.usersService.findOne(id);
  }

  async login(user: IUser, response: Response) {
    const { _id, name, email, role, permissions, company } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      role,
    };

    // create refresh Token
    const refreshToken = this.createRefreshToken({ name: 'thanhdo' });
    await this.usersService.updateRefreshTokenUser(_id, refreshToken);

    // set refresh token as cookies
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false, // Chỉ bật nếu chạy HTTPS
      sameSite: 'lax',
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) * 1000,
    });
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
        permissions,
        company,
      },
    };
  }

  async register(user: RegisterUserDto) {
    const newUser = await this.usersService.register(user);
    return {
      _id: newUser?._id,
      createdAt: newUser.createdAt,
    };
  }

  createRefreshToken = (payload: any) => {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
    });
    return refreshToken;
  };

  processRefreshToken = async (refreshToken: string, response: Response) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      // kiểm tra xem có user nào trùng refresh token hay không
      const user = await this.usersService.findUserByRefreshToken(refreshToken);
      if (user) {
        // login for user and create new access token
        const { _id, name, email, role } = user;
        const payload = {
          sub: 'token login',
          iss: 'from server',
          _id,
          name,
          email,
          role,
        };

        // create refresh Token
        const refreshToken = this.createRefreshToken(payload);
        await this.usersService.updateRefreshTokenUser(
          _id.toString(),
          refreshToken,
        );

        const userRole = user.role as unknown as { _id: string; name: string };
        const temp = await this.rolesService.findOne(userRole._id);
        response.clearCookie('refresh_token');

        // set refreshtoken as cokies
        response.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          maxAge:
            ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) * 1000,
        });
        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id,
            name,
            email,
            role,
            permissions: temp?.permissions ?? [],
          },
        };
      } else {
        throw new BadRequestException(
          'Thông tin xác thực (refresh token) không hợp lệ hoặc đã hết hạn',
        );
      }
    } catch (error) {
      throw new BadRequestException(
        'Thông tin xác thực (refresh token) không hợp lệ hoặc đã hết hạn',
      );
    }
  };

  logout = async (user: IUser, response: Response) => {
    await this.usersService.updateRefreshTokenUser(user._id, '');
    response.clearCookie('refresh_token');
    return 'Đăng xuất thành công';
  };

  async forgotPassword(email: string) {
    return await this.usersService.forgotPassword(email);
  }
}
