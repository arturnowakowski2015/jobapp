import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateJobDto {
  @ApiProperty()
  @Length(3, 50)
  title: string;

  @ApiProperty()
  @Length(5, 15)
  shortDescription: string;

  @ApiProperty()
  @Length(5, 250)
  longDescription: string;

  @ApiProperty()
  @Length(5, 15)
  logo: string;

  @ApiProperty()
  @Length(5, 15)
  companyName: string;
}
