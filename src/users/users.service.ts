import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IsEmail } from 'class-validator';
import { IUser } from './user.interface';
import aqp from 'api-query-params';
import { Role, RoleDocument } from '../roles/schemas/role.schema';
import { USER_ROLE } from '../databases/sample';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
    private mailerService: MailerService,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto, user: IUser) {
    const { name, email, password, age, gender, address, role, company } =
      createUserDto;

    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(
        `Email : ${email} đã tồn tại, vui lòng tạo email khác`,
      );
    }

    const hashPassword = this.getHashPassword(password);
    const newCreated = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role,
      company,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return newCreated;
  }

  // register a user
  async register(newRegisterUser: RegisterUserDto) {
    const { name, email, password, age, gender, address } = newRegisterUser;

    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(
        `Email : ${email} đã tồn tại, vui lòng sử dụng email khác`,
      );
    }

    // fetch user role

    const userRole = await this.roleModel.findOne({ name: USER_ROLE });
    const hashPassword = this.getHashPassword(password);
    const newRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: userRole?._id,
    });
    return newRegister;
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, skip, sort, projection, population } = aqp(queryString);

    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .select('-password')
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
    if (!mongoose.Types.ObjectId.isValid(id)) return `Người dùng không tồn tại`;

    return this.userModel
      .findOne({
        _id: id,
      })
      .select('-password')
      .populate({ path: 'role', select: { name: 1, _id: 1 } });
  }

  findOneByUsername(username: string) {
    return this.userModel
      .findOne({
        email: username,
      })
      .populate({ path: 'role', select: { name: 1 } });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return `Người dùng không tồn tại`;
    // không cho xóa tài khoản admin
    const foundedUser: IUser = await this.userModel.findById(id);
    if (foundedUser && foundedUser.email === 'admin@gmail.com') {
      throw new BadRequestException('Không thể xóa tài khoản admin');
    }
    await this.userModel.updateOne(
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
    return this.userModel.softDelete({
      _id: id,
    });
  }

  updateRefreshTokenUser = async (_id: string, refreshToken: string) => {
    return await this.userModel.updateOne(
      {
        _id,
      },
      {
        refreshToken,
      },
    );
  };

  async findUserByRefreshToken(refreshToken: string) {
    return await this.userModel
      .findOne({
        refreshToken,
      })
      .populate({
        path: 'role',
        select: { name: 1 },
      });
  }

  async changePassword(id: string, data: UpdatePasswordDto) {
    const user = await this.userModel.findById(id);
    if (!user) throw new BadRequestException('user not found');
    if (!compareSync(data.oldPassword, user.password)) {
      throw new BadRequestException('old password not match');
    }
    return await this.userModel.updateOne(
      { _id: id },
      { password: this.getHashPassword(data.newPassword) },
    );
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('user not found');
    }
    const newPassword = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(newPassword);
    await this.userModel.updateOne(
      { _id: user._id },
      { password: this.getHashPassword(newPassword) },
    );
    console.log('success');
    await this.mailerService.sendMail({
      to: email,
      from: '"No reply" <noreply@example.com>', // override default from
      subject: 'your new pasword',
      html: `<p> Hello, you just pressed forgot password, your new password is ${newPassword} . Please do not share with anyone
 </p>`,
      // template: 'new-job', // template body content
      // interface của sendMail có trường là context , trường này dùng để truyền động biến vào trong file hbs
      //
      // context: {
      //   receiver: subs.name,
      //   jobs: jobsForSubscriber,
      //   website: website_url,
      // },
    });
    return { success: true };
  }
}
