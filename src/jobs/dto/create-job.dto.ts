import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

//data transfer object //
class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  name: string;
}
export class CreateJobDto {
  @IsNotEmpty({ message: 'Tên công việc không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Kĩ năng không được để trống' })
  skills: string[];

  @IsNotEmpty({ message: 'Công ty không được để trống' })
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  //   @IsNotEmpty({ message: 'Vị trí không được để trống' })
  //   location: string;

  @IsNotEmpty({ message: 'Mức lương không được để trống' })
  salary: number;

  @IsNotEmpty({ message: 'Số lượng không được để trống' })
  quantity: number;

  @IsNotEmpty({ message: 'Level không được để trống' })
  level: string;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;

  @IsNotEmpty({ message: 'Ngày bắt đầu không được để trống' })
  startDate: string;

  @IsNotEmpty({ message: 'Ngày kết thúc không được để trống' })
  endDate: string;

  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  isActive: boolean;
}
