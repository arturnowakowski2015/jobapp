import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BlacklistedCandidate {
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
  reason: string;
}

@Entity()
export class PaginatedBlacklistedCandidate {
  @ApiProperty({ isArray: true, type: BlacklistedCandidate })
  data: BlacklistedCandidate[];

  @ApiProperty()
  count: number;
}
