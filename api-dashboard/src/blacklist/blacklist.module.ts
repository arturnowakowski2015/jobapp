import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistController } from './blacklist.controller';
import { BlacklistService } from './blacklist.service';
import { BlacklistedCandidate } from './model/blacklisted-candidate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistedCandidate])],
  providers: [BlacklistService],
  controllers: [BlacklistController],
})
export class BlacklistModule {}
