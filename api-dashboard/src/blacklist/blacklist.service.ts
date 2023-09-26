import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { SortBlacklistedCandidatesQueryDto } from './dto/sort-query.dto';
import { BlacklistedCandidate } from './model/blacklisted-candidate.entity';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlacklistedCandidate)
    private blacklistedCandidateRepository: Repository<BlacklistedCandidate>,
  ) {}

  async findBlacklistedCandidates(
    pagination: PaginationQueryDto,
    sort: SortBlacklistedCandidatesQueryDto,
  ) {
    const [data, count] =
      await this.blacklistedCandidateRepository.findAndCount({
        take: pagination.take,
        skip: pagination.skip,
        order: {
          [sort.sortBy]: sort.order,
        },
      });

    return { data, count };
  }
}
