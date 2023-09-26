import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { JwtAuthGuard } from 'src/jwt/guards/jwt-auth.guard';
import { BlacklistService } from './blacklist.service';
import { SortBlacklistedCandidatesQueryDto } from './dto/sort-query.dto';
import { PaginatedBlacklistedCandidate } from './model/blacklisted-candidate.entity';

@ApiTags('Blacklist')
@Controller('blacklist')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @UseGuards(JwtAuthGuard)
  @Get('candidates')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: PaginatedBlacklistedCandidate,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getAll(
    @Query()
    pagination: PaginationQueryDto,
    @Query() sort: SortBlacklistedCandidatesQueryDto,
  ) {
    return this.blacklistService.findBlacklistedCandidates(pagination, sort);
  }
}
