import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import * as cookieParser from 'cookie-parser';
import { Request, response, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //username/ pass là 2 tham số thư viện passport nó ném về
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }

    return null;
  }

  async login(user: IUser, response: Response) {
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
    const refreshToken = this.createRefreshToken({ name: 'thanhdo' });
    await this.usersService.updateRefreshTokenUser(_id, refreshToken);

    // set refresh token as cookies
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) * 1000,
    });
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
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
}
