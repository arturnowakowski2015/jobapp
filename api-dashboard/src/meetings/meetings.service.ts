import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { DateFilterQueryDto } from './dto/date-filter-query.dto';
import { Meeting } from './model/meeting.entity';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) {}

  findAll(dateFilter: DateFilterQueryDto) {
    return this.meetingRepository.find({
      select: {
        id: true,
        date: true,
        createdAt: true,
        updatedAt: true,
        place: true,
        type: true,
      },
      relations: { candidate: true, job: true },
      where: {
        date: Between(
          new Date(dateFilter.year, dateFilter.month - 1, 1),
          new Date(dateFilter.year, dateFilter.month, 0),
        ),
      },
    });
  }

  async create(createMeetingDto: CreateMeetingDto) {
    await this.meetingRepository.insert(createMeetingDto);
  }

  async delete(id: string) {
    await this.meetingRepository.delete({ id });
  }
}
