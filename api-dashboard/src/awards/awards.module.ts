import { Module } from '@nestjs/common';
import { AwardsResolver } from './awards.resolver';

@Module({
  imports: [],
  providers: [AwardsResolver],
})
export class AwardsModule {}
