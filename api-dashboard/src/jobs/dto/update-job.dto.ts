import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class UpdateJobDto {
  @ApiProperty()
  @IsOptional()
  @Length(3, 50)
  title?: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 15)
  shortDescription?: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 250)
  longDescription?: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 15)
  logo?: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 15)
  companyName?: string;
}
