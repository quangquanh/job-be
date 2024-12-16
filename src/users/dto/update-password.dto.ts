import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  newPassword: string;
}
