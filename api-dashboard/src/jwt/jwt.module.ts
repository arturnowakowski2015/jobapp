import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/model/user.entity';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [NestJwtModule.register({}), TypeOrmModule.forFeature([User])],
  providers: [JwtService, JwtStrategy, RefreshTokenStrategy],
  exports: [JwtService],
})
export class JwtModule {}
