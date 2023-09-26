import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsUUID, Length } from 'class-validator';
import { MeetingType, meetingTypes } from '../model/meeting.entity';

export class CreateMeetingDto {
  @ApiProperty({ enum: meetingTypes })
  @IsIn(meetingTypes)
  type: MeetingType;

  @ApiProperty({
    example:
      'ISO 8601 date string, for example: 2023-02-06T19:45:36.834Z, you can use toISOString() for that.',
  })
  @IsDateString(
    { strict: true, strictSeparator: true },
    {
      message:
        'Date must be valid ISO 8601 date string, for example: 2023-02-06T19:45:36.834Z, you can use toISOString() for that.',
    },
  )
  date: string;

  @ApiProperty()
  @Length(3, 50)
  place: string;

  @ApiProperty()
  @IsUUID()
  candidateId: string;

  @ApiProperty()
  @IsUUID()
  jobId: string;
}
