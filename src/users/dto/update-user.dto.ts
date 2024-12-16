import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  _id: string;

  @IsOptional()
  name: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsOptional()
  email: string;

  @IsOptional()
  age: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  address: string;
}
