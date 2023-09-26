import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateBlacklistedCandidateDto {
  @ApiProperty()
  @Length(3, 15)
  name: string;

  @ApiProperty()
  @Length(3, 150)
  reason: string;
}
