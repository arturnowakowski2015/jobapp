import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { DateFilterQueryDto } from './dto/date-filter-query.dto';
import { MeetingsService } from './meetings.service';
import { Meeting } from './model/meeting.entity';

@ApiTags('Meetings')
@Controller('meetings')
export class JobsController {
  constructor(private meetingsService: MeetingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [Meeting],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getAll(@Query() dateFilter: DateFilterQueryDto) {
    return this.meetingsService.findAll(dateFilter);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: CreateMeetingDto })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingsService.create(createMeetingDto);
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
    return this.meetingsService.delete(id);
  }
}
