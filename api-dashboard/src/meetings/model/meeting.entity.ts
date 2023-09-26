import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Candidate } from '../../candidates/model/candidate.entity';
import { Job } from '../../jobs/model/job.entity';

export const meetingTypes = ['offline', 'online'] as const;
export type MeetingType = (typeof meetingTypes)[number];

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @Column()
  @ApiProperty()
  date: Date;

  @Column()
  @ApiProperty({ enum: meetingTypes })
  type: MeetingType;

  @Column()
  @ApiProperty()
  place: string;

  @ApiProperty({ type: () => Candidate })
  @ManyToOne(() => Candidate, (candidate) => candidate.meetings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'candidateId' })
  candidate: Candidate;

  @Column()
  candidateId: string;

  @ApiProperty({ type: () => Job })
  @ManyToOne(() => Job, (job) => job.meetings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @Column()
  jobId: string;
}
