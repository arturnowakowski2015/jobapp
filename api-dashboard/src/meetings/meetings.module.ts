import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsService } from './meetings.service';
import { JobsController } from './meetings.controller';
import { Meeting } from './model/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  providers: [MeetingsService],
  controllers: [JobsController],
})
export class MeetingsModule {}
