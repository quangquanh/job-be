import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth') //  route /
export class AuthController {
  constructor(private authService: AuthService) {}

  // đăng nhập

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  // đăng ký

  @Public()
  @ResponseMessage('Register a user successfully !')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
