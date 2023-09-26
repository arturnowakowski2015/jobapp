import { DataSource } from 'typeorm';
import { BlacklistedCandidate } from '../blacklist/model/blacklisted-candidate.entity';
import { Candidate } from '../candidates/model/candidate.entity';
import { Job } from '../jobs/model/job.entity';
import { Meeting } from '../meetings/model/meeting.entity';
import { User } from '../users/model/user.entity';

export const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: 'db',
  logging: true,
  entities: [User, Candidate, Job, BlacklistedCandidate, Meeting],
  migrations: ['dist/db/migrations/*.js'],
});
