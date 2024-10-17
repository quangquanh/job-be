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
import { ResumesService } from './Resumes.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { CreateResumeDto } from './dto/create-resume.dto';
import { IUser } from 'src/users/user.interface';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { use } from 'passport';

@Controller('resumes') // => /Jobs
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @ResponseMessage('Create a new resume')
  @Post()
  async create(@Body() createResumeDto: CreateResumeDto, @User() user: IUser) {
    const newCreatedResume = await this.resumesService.create(
      createResumeDto,
      user,
    );
    return {
      _id: newCreatedResume._id,
      createdAt: newCreatedResume.createdAt,
    };
  }

  // update a resume
  @ResponseMessage('"Update status resume')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('status') status: string,
    @User() user: IUser,
  ) {
    return this.resumesService.update(id, status, user);
  }

  // delete a resume
  @ResponseMessage('Delete a resume')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }

  // fetch a ersume by id

  @ResponseMessage('fetch a resume by id')
  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.resumesService.findOne(id);
  }

  // fetch job with paginate
  @Get()
  @ResponseMessage('Fetch all resumes with paginate')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string,
  ) {
    return this.resumesService.findAll(+currentPage, +limit, queryString);
  }

  @Post('by-user')
  @ResponseMessage('Get Resumes by User')
  findCVbyUser(@User() user: IUser) {
    return this.resumesService.findByUser(user);
  }
}
