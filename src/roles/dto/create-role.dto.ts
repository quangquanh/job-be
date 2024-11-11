import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Tên vai trò không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;

  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  @IsBoolean({ message: 'Trạng thái là gia tri yes/no' })
  isActive: boolean;

  @IsNotEmpty({ message: 'Permission không được để trống' })
  @IsArray()
  @IsMongoId({ each: true })
  permissions: mongoose.Schema.Types.ObjectId[];
}
