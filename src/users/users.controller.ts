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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from '../decorator/customize';
import { IUser } from './user.interface';
import { use } from 'passport';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('users')
@Controller('users') // => /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ResponseMessage('Create a new user')
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    const newCreatedUser = await this.usersService.create(createUserDto, user);
    return {
      _id: newCreatedUser._id,
      createdAt: newCreatedUser.createdAt,
    };
  }

  @ResponseMessage('Change password')
  @Patch('change-password')
  async changePassword(@Body() data: UpdatePasswordDto, @User() user: IUser) {
    return this.usersService.changePassword(user._id, data);
  }

  @ResponseMessage('Fetch user with paginate')
  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, queryString);
  }

  @Public()
  @ResponseMessage('fetch a user by id')
  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.usersService.findOne(id);
  }

  @ResponseMessage('Update a user')
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return this.usersService.update(updateUserDto, user);
  }

  @ResponseMessage('Delete a user')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
