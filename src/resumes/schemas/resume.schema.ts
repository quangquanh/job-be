import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
  // - level: string- description : html <string>- startDate: date- endDate: date- isActive: boolean
  // Thông tin riêng của module
  @Prop()
  email: string;

  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  url: string;

  @Prop()
  status: string;

  @Prop()
  companyId: mongoose.Schema.Types.ObjectId;

  @Prop()
  jobId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Array })
  history: {
    status: string;
    updateAt: Date;
    updatedBy: {
      _id: mongoose.Schema.Types.ObjectId;
      email: string;
    };
  }[];

  //   Các trường thông tin mặc định
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  // các trường thông tin tùy chọn

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
