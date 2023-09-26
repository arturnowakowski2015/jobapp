import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { AwardsModule } from 'src/awards/awards.module';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import { CandidatesModule } from 'src/candidates/candidates.module';
import { sqliteDataSource } from 'src/db/datasource';
import { JobsModule } from 'src/jobs/jobs.module';
import { MeetingsModule } from 'src/meetings/meetings.module';
import { ReadersModule } from 'src/readers/readers.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AwardsModule,
    JobsModule,
    AuthModule,
    UsersModule,
    CandidatesModule,
    BlacklistModule,
    MeetingsModule,
    ReadersModule,
    TypeOrmModule.forRoot(sqliteDataSource.options),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
