import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Resume, ResumeDocument } from './schemas/Resume.schema';
import { IUser } from 'src/users/user.interface';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    private resumeModel: SoftDeleteModel<ResumeDocument>,
  ) {}
  async create(createResumeDto: CreateResumeDto, user: IUser) {
    const { url, companyId, jobId } = createResumeDto;

    const newCreatedResume = await this.resumeModel.create({
      url,
      companyId,
      userId: user._id,
      jobId,
      status: 'PENDING',
      history: [
        {
          status: 'PENDING',
          updatedAt: new Date(),
          // phân biệt updatedAt : Date và updated: new Date() : Trong đoạn mã của bạn, updatedAt: new Date() được sử dụng để tạo ra một đối tượng Date mới đại diện cho thời gian hiện tại, tại thời điểm lệnh đó được thực thi. Đây là cách để đảm bảo rằng giá trị updatedAt chứa thời gian cụ thể khi sự kiện cập nhật xảy ra.
          // Nếu bạn chỉ sử dụng Date, điều này sẽ không hoạt động vì Date chỉ là một lớp hoặc kiểu dữ liệu trong JavaScript, và nó cần được khởi tạo (tạo đối tượng cụ thể) bằng cách gọi new Date() để lấy thời gian hiện tại.
          updatedBy: {
            _id: user._id,
            email: user.email,
          },
        },
      ],
    });
    return newCreatedResume;
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, skip, sort, projection, population } = aqp(queryString);

    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.resumeModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.resumeModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select(projection as any)
      .exec();
    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Không tìm thấy CV');
    }

    return await this.resumeModel.findOne({
      _id: id,
    });
  }

  async update(id: string, status: string, user: IUser) {
    return await this.resumeModel.updateOne(
      { _id: id },
      {
        status,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
        $push: {
          history: {
            status: status, // hoặc trạng thái mới bạn muốn cập nhật
            updatedAt: new Date(),
            updatedBy: {
              _id: user._id,
              email: user.email,
            },
          },
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('CV không tồn tại');
    }
    await this.resumeModel.updateOne(
      {
        _id: id,
      },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return this.resumeModel.softDelete({
      _id: id,
    });
  }

  async findByUser(user: IUser) {
    return await this.resumeModel.find({
      userId: user._id,
    });
  }
}
