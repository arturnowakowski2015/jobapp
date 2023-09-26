import { Module } from '@nestjs/common';
import { ReadersGateway } from './readers.gateway';

@Module({
  providers: [ReadersGateway],
})
export class ReadersModule {}
