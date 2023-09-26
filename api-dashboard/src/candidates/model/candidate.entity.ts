import { ApiProperty } from '@nestjs/swagger';
import { Meeting } from '../../meetings/model/meeting.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Candidate {
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
  name: string;

  @Column()
  @ApiProperty()
  position: string;

  @Column()
  @ApiProperty()
  shortDescription: string;

  @Column()
  @ApiProperty()
  longDescription: string;

  @Column()
  @ApiProperty()
  logo: string;

  @ApiProperty()
  @Column()
  companyName: string;

  @OneToMany(() => Meeting, (meeting) => meeting.candidate)
  meetings: Meeting[];

  @Column({ nullable: true })
  appliedToJobId?: string;
}
