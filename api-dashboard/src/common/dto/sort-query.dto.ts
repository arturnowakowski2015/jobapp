import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

const orderOptions = ['asc', 'desc'] as const;
export type Order = (typeof orderOptions)[number];

export class SortQueryDto {
  @ApiProperty()
  @IsString()
  sortBy: string;

  @ApiProperty({ enum: orderOptions })
  @IsIn(orderOptions)
  order: Order;
}
