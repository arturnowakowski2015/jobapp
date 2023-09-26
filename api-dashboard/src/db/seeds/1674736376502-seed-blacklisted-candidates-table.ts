import { CreateBlacklistedCandidateDto } from 'src/blacklist/dto/create-blacklisted-candidate.dto';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { faker } from '@faker-js/faker';
import { BlacklistedCandidate } from 'src/blacklist/model/blacklisted-candidate.entity';

const createRandomBlacklistedCandidate = (): CreateBlacklistedCandidateDto => ({
  name: faker.name.fullName(),
  reason: faker.lorem.words(6),
});

export class seedBlacklistedCandidatesTable1674736376502
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const candidates = Array.from({ length: 83 }).map(
      createRandomBlacklistedCandidate,
    );

    const queries = candidates.map((candidate) =>
      queryRunner.manager.save(
        queryRunner.manager.create<BlacklistedCandidate>(
          'blacklisted_candidate',
          candidate,
        ),
      ),
    );

    await Promise.all(queries);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM blacklisted_candidate`);
  }
}
