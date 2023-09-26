import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PUBLIC_JOBS_MOCK } from 'src/db/mocks/public-jobs.mock';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsService } from './jobs.service';
import { Job } from './model/job.entity';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('public')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  getPublicJobs() {
    return PUBLIC_JOBS_MOCK;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [Job],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getAll() {
    return this.jobsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Job,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Job not found',
  })
  async find(@Param('id') id: string) {
    return this.jobsService.findBy({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Job,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateJobDto })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Job,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Candidate not found',
  })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  delete(@Param('id') id: string) {
    this.jobsService.delete(id);
  }
}
