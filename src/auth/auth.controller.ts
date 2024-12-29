import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public, ResponseMessage, User } from '../decorator/customize';
import {
  ForgotPasswordDto,
  RegisterUserDto,
  UserLoginDto,
} from '../users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from '../users/user.interface';
import { RolesService } from '../roles/roles.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
//  route //
export class AuthController {
  constructor(
    private authService: AuthService,
    private rolesService: RolesService,
  ) {}

  // đăng nhập

  @UseGuards(LocalAuthGuard)
  @Public()
  @UseGuards(ThrottlerGuard)
  @ApiBody({ type: UserLoginDto })
  @ResponseMessage('User Login')
  @Post('/login')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  // đăng ký

  @Public()
  @ResponseMessage('Register a user successfully !')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Public()
  @ResponseMessage('Forgot password successfully !')
  @Post('/forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('user-info')
  getUserInfo(@Req() req) {
    return this.authService.getProfile(req.user._id);
  }

  @ResponseMessage('get user information')
  @Get('/account')
  async handleGetAccount(@User() user: IUser) {
    const temp = (await this.rolesService.findOne(user.role._id)) as any;
    user.permissions = temp.permissions;
    return { user };
  }

  @ResponseMessage('"Get User by refresh token')
  @Get('/refresh')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authService.processRefreshToken(refreshToken, response);
  }

  //log out
  @ResponseMessage('Logout User')
  @Post('/logout')
  handleLogout(
    @User() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(user, response);
  }
}
