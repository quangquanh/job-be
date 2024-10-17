import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateCVDto {
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'userId không được để trống' })
  @IsMongoId()
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'url không được để trống' })
  url: string;

  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  status: string;

  @IsNotEmpty({ message: 'companyId không được để trống' })
  @IsMongoId()
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'jobId không được để trống' })
  @IsMongoId()
  jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateResumeDto {
  @IsNotEmpty({ message: 'url không được để trống' })
  url: string;

  @IsNotEmpty({ message: 'companyId không được để trống' })
  @IsMongoId()
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'jobId không được để trống' })
  @IsMongoId()
  jobId: mongoose.Schema.Types.ObjectId;
}
