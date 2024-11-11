import { BadRequestException, Injectable } from '@nestjs/common';

import { IUser } from 'src/users/user.interface';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { error } from 'console';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
  ) {}
  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const { name, description, isActive, permissions } = createRoleDto;
    const isExist = await this.roleModel.findOne({ name });
    if (isExist)
      throw new BadRequestException(`Role với name ${name} đã tồn tại`);
    const newCreatedRole = await this.roleModel.create({
      name,
      description,
      isActive,
      permissions,
    });
    return newCreatedRole;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`can't find this role with ${id}`);
    }
    return await this.roleModel.updateOne(
      { _id: id },
      {
        ...updateRoleDto,
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
    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.roleModel
      .find(filter)
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

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`can't find this role with ${id}`);
    }

    return (await this.roleModel.findById(id)).populate({
      path: 'permissions',
      select: { id: 1, apiPath: 1, name: 1, method: 1, module: 1 },
    });
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Công việc không tồn tại';
    // không cho xóa role admin
    const foundedRole = await this.roleModel.findById(id);
    if (foundedRole.name === 'ADMIN') {
      throw new BadRequestException('Không thể xóa vai trò admin');
    }
    await this.roleModel.updateOne(
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
    return this.roleModel.softDelete({
      _id: id,
    });
  }
}
