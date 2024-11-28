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
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { IUser } from 'src/users/user.interface';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles') // => role
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ResponseMessage('Create a new Role')
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @User() user: IUser) {
    const newCreatedRole = await this.rolesService.create(createRoleDto, user);
    return {
      _id: newCreatedRole._id,
      createdAt: newCreatedRole.createdAt,
    };
  }

  // update a role
  @ResponseMessage('update a role')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @User() user: IUser,
  ) {
    return this.rolesService.update(id, updateRoleDto, user);
  }

  // delete a role
  @ResponseMessage('Delete a role')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.rolesService.remove(id, user);
  }

  // fetch a job by id

  @ResponseMessage('fetch a job by id')
  @Get(':id')
  @Public()
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.rolesService.findOne(id);
  }

  // fetch role with paginate
  @Get()
  @ResponseMessage('Fetch role with paginate')
  @Public()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string,
  ) {
    return this.rolesService.findAll(+currentPage, +limit, queryString);
  }
}
