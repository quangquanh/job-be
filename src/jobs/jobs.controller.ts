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
import { JobsService } from './jobs.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { CreateJobDto } from './dto/create-job.dto';
import { IUser } from 'src/users/user.interface';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs') // => /Jobs
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ResponseMessage('Create a new Job')
  @Post()
  async create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    const newCreatedJob = await this.jobsService.create(createJobDto, user);
    return {
      _id: newCreatedJob._id,
      createdAt: newCreatedJob.createdAt,
    };
  }

  // update a job
  @ResponseMessage('update a job')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  // delete a job
  @ResponseMessage('Delete a job')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }

  // fetch a job by id

  @ResponseMessage('fetch a job by id')
  @Get(':id')
  @Public()
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.jobsService.findOne(id);
  }

  // fetch job with paginate
  @Get()
  @ResponseMessage('Fetch company with paginate')
  @Public()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() queryString: string,
  ) {
    return this.jobsService.findAll(+currentPage, +limit, queryString);
  }
}
