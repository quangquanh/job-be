import { BadRequestException, Injectable } from '@nestjs/common';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';
import { error } from 'console';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { IUser } from '../users/user.interface';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
  ) {}
  async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
    const { email, name, skills } = createSubscriberDto;
    const isExist = this.subscriberModel.findOne({ email });
    if (isExist) throw new BadRequestException('tài khoản này đã tồn tại');

    const newCreatedSubscriber = await this.subscriberModel.create({
      email,
      name,
      skills,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return newCreatedSubscriber;
  }

  async update(updateSubscriberDto: UpdateSubscriberDto, user: IUser) {
    return await this.subscriberModel.updateOne(
      // tim theo email
      { email: user.email },
      {
        ...updateSubscriberDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
      // sử dụng upsert : nếu bản ghi đã tồn tại, update, nếu bản ghi chưa tồn tại : tạo mới
      { upsert: true },
    );
  }

  // get subscriber email

  async getSkills(user: IUser) {
    const { email } = user;
    return await this.subscriberModel.findOne({ email }, { skills: 1 });
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, skip, sort, projection, population } = aqp(queryString);

    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.subscriberModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.subscriberModel
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

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`can't find this subscriber with ${id}`);
    }

    return this.subscriberModel.findOne({
      _id: id,
    });
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Không còn tồn tại';
    await this.subscriberModel.updateOne(
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
    return this.subscriberModel.softDelete({
      _id: id,
    });
  }
}
