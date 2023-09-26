import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { SortQueryDto } from 'src/common/dto/sort-query.dto';

const sortOptions = ['name', 'reason'] as const;
export type SortBy = (typeof sortOptions)[number];

export class SortBlacklistedCandidatesQueryDto extends SortQueryDto {
  @ApiProperty({ enum: sortOptions })
  @IsIn(sortOptions)
  sortBy: SortBy;
}
