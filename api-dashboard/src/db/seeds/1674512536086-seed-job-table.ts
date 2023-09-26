import { faker } from '@faker-js/faker';
import { getRandomInt } from 'src/common/utils/getRandomInt';
import { CreateJobDto } from 'src/jobs/dto/create-job.dto';
import { Job, statuses } from 'src/jobs/model/job.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const createRandomStatus = () => {
  const randomIndex = getRandomInt(0, statuses.length - 1);
  return statuses[randomIndex];
};

const createRandomJob = (): CreateJobDto & Pick<Job, 'status'> => ({
  companyName: faker.company.name(),
  logo: 'https://picsum.photos/200/300',
  longDescription: faker.lorem.words(5),
  shortDescription: faker.lorem.words(2),
  title: faker.name.jobTitle(),
  status: createRandomStatus(),
});

export class seedJobTable1674512536086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const jobs = Array.from({ length: 50 }).map(createRandomJob);
    const queries = jobs.map((candidate) =>
      queryRunner.manager.save(
        queryRunner.manager.create<Job>('job', candidate),
      ),
    );
    await Promise.all(queries);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM job`);
  }
}
