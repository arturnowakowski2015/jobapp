import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class DateFilterQueryDto {
  @ApiProperty()
  @Min(1)
  @Max(12)
  month: number;

  @ApiProperty()
  @Min(2022)
  year: number;
}
