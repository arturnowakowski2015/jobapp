import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  @Length(3, 15)
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @Length(3, 15)
  lastName?: string;
}
