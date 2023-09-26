import { faker } from '@faker-js/faker';
import { Candidate } from 'src/candidates/model/candidate.entity';
import { getRandomInt } from 'src/common/utils/getRandomInt';
import { Job } from 'src/jobs/model/job.entity';
import { CreateMeetingDto } from 'src/meetings/dto/create-meeting.dto';
import { Meeting, meetingTypes } from 'src/meetings/model/meeting.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const createRandomMeetingType = () => {
  const randomIndex = getRandomInt(0, meetingTypes.length - 1);

  return meetingTypes[randomIndex];
};

type CreateRandomMeetingProps = {
  candidateId: string;
  jobId: string;
};

const createRandomMeeting = ({
  candidateId,
  jobId,
}: CreateRandomMeetingProps): CreateMeetingDto => {
  const type = createRandomMeetingType();

  return {
    date: faker.date
      .between(
        faker.date.past(1).toISOString(),
        faker.date.soon(60).toISOString(),
      )
      .toISOString(),
    place:
      type === 'offline'
        ? faker.address.streetAddress(true)
        : faker.internet.url(),
    type,
    candidateId,
    jobId,
  };
};

export class seedMeetingsTable1675369766988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const candidateRepository =
      queryRunner.manager.getRepository<Candidate>('candidate');
    const candidates = await candidateRepository.find({ select: { id: true } });

    const jobRepository = queryRunner.manager.getRepository<Job>('job');
    const jobs = await jobRepository.find({ select: { id: true } });

    const meetings = Array.from({ length: 72 }).map(() => {
      const randomCandidateIndex = getRandomInt(0, candidates.length - 1);
      const randomCandidate = candidates[randomCandidateIndex];

      const randomJobIndex = getRandomInt(0, jobs.length - 1);
      const randomJob = jobs[randomJobIndex];

      return createRandomMeeting({
        candidateId: randomCandidate.id,
        jobId: randomJob.id,
      });
    });

    const queries = meetings.map((meeting) =>
      queryRunner.manager.save(
        queryRunner.manager.create<Meeting>('meeting', meeting),
      ),
    );

    await Promise.all(queries);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM meeting`);
  }
}
