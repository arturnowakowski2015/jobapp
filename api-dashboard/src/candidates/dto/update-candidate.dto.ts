import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateCandidateDto {
  @ApiProperty()
  @IsOptional()
  @Length(3, 15)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @Length(3, 15)
  position?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  shortDescription?: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 15)
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
