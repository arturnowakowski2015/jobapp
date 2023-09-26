import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ minimum: 0, description: 'Min 0' })
  @IsNumber()
  @Min(0)
  skip: number;

  @ApiProperty({ minimum: 5, maximum: 20, description: 'Min: 5, Max: 20' })
  @IsNumber()
  @Min(5)
  @Max(20)
  take: number;
}
