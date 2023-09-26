import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class CreateCandidateDto {
  @ApiProperty()
  @Length(3, 15)
  name: string;

  @ApiProperty()
  @Length(3, 50)
  position: string;

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

  @ApiProperty()
  @IsOptional()
  appliedToJobId?: string;
}
