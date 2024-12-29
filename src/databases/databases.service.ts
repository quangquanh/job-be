import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Job, JobDocument } from '../jobs/schemas/job.schema';
import {
  Permission,
  PermissionDocument,
} from '../permissions/schemas/permission.schema';
import { Role, RoleDocument } from '../roles/schemas/role.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

import { UsersService } from '../users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private readonly logger = new Logger(DatabasesService.name);
  constructor(
    @InjectModel(Role.name)
    private rolesModel: SoftDeleteModel<RoleDocument>,

    @InjectModel(User.name)
    private usersModel: SoftDeleteModel<UserDocument>,

    @InjectModel(Permission.name)
    private permissionsModel: SoftDeleteModel<PermissionDocument>,

    private configService: ConfigService,
    private usersService: UsersService,
  ) {}
  async onModuleInit() {
    const isInit = this.configService.get<string>('SHOULD_INIT');
    if (Boolean(isInit)) {
      const countUser = await this.usersModel.count({});
      const countPermission = await this.permissionsModel.count({});
      const countRole = await this.rolesModel.count({});

      //create permissions
      if (countPermission === 0) {
        await this.permissionsModel.insertMany(INIT_PERMISSIONS);
        //bulk create
      }

      // create role
      if (countRole === 0) {
        const permissions = await this.permissionsModel.find({}).select('_id');
        await this.rolesModel.insertMany([
          {
            name: ADMIN_ROLE,
            description: 'Admin thì full quyền :v',
            isActive: true,
            permissions: permissions,
          },
          {
            name: USER_ROLE,
            description: 'Người dùng/Ứng viên sử dụng hệ thống',
            isActive: true,
            permissions: [], //không set quyền, chỉ cần add ROLE
          },
        ]);
      }

      if (countUser === 0) {
        const adminRole = await this.rolesModel.findOne({ name: ADMIN_ROLE });
        const userRole = await this.rolesModel.findOne({ name: USER_ROLE });
        await this.usersModel.insertMany([
          {
            name: "I'm admin",
            email: 'admin@gmail.com',
            password: this.usersService.getHashPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            age: 69,
            gender: 'MALE',
            address: 'VietNam',
            role: adminRole?._id,
          },
          {
            name: "I'm Hỏi Dân IT",
            email: 'hoidanit@gmail.com',
            password: this.usersService.getHashPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            age: 96,
            gender: 'MALE',
            address: 'VietNam',
            role: adminRole?._id,
          },
          {
            name: "I'm normal user",
            email: 'user@gmail.com',
            password: this.usersService.getHashPassword(
              this.configService.get<string>('INIT_PASSWORD'),
            ),
            age: 69,
            gender: 'MALE',
            address: 'VietNam',
            role: userRole?._id,
          },
        ]);
      }

      if (countUser > 0 && countRole > 0 && countPermission > 0) {
        this.logger.log('>>> ALREADY INIT SAMPLE DATA...');
      }
    }
  }
}
