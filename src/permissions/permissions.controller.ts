import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './Permissions.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { CreatePermissionDto } from './dto/create-Permission.dto';
import { IUser } from 'src/users/user.interface';
import { UpdatePermissionDto } from './dto/update-Permission.dto';

@Controller('permissions') // => /Permissions
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ResponseMessage('Create a new Job')
  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
    @User() user: IUser,
  ) {
    const newCreatedPermission = await this.permissionsService.create(
      createPermissionDto,
      user,
    );
    return {
      _id: newCreatedPermission._id,
      createdAt: newCreatedPermission.createdAt,
    };
  }

  // update a Permission
  @ResponseMessage('update a Permission')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @User() user: IUser,
  ) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  // delete a Permission
  @ResponseMessage('Delete a Permission')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.permissionsService.remove(id, user);
  }

  // fetch a Permission by id

  @ResponseMessage('fetch a Permission by id')
  @Get(':id')
  @Public()
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.permissionsService.findOne(id);
  }

  // fetch Permission with paginate
  @Get()
  @ResponseMessage('Fetch permission with paginate')
  @Public()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string,
  ) {
    return this.permissionsService.findAll(+currentPage, +limit, queryString);
  }
}
