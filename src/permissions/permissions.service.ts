import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-Permission.dto';
import { UpdatePermissionDto } from './dto/update-Permission.dto';
import { IUser } from 'src/users/user.interface';
import { Permission, PermissionDocument } from './schemas/Permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { error } from 'console';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private PermissionModel: SoftDeleteModel<PermissionDocument>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    const { name, apiPath, method, module } = createPermissionDto;
    // xử lý logic xem đã trùng apiPath với method chưa bằng hàm findOne
    const isExist: boolean = await this.PermissionModel.findOne({
      apiPath,
      method,
    });
    if (isExist) {
      const newCreatedPermission = await this.PermissionModel.create({
        name,
        apiPath,
        method,
        module,
        createdBy: {
          _id: user._id,
          email: user.email,
        },
      });
      return newCreatedPermission;
    }
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
    user: IUser,
  ) {
    return await this.PermissionModel.updateOne(
      { _id: id },
      {
        ...updatePermissionDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, skip, sort, projection, population } = aqp(queryString);

    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.PermissionModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.PermissionModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
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

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`can't find this Permission with ${id}`);
    }

    return this.PermissionModel.findOne({
      _id: id,
    });
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Công việc không tồn tại';
    await this.PermissionModel.updateOne(
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
    return this.PermissionModel.softDelete({
      _id: id,
    });
  }
}
