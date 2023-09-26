import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_REFRESH_SECRET } from '../constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/model/user.entity';
import { Repository } from 'typeorm';
import { RequestUser } from 'src/types/request';
import * as argon2 from 'argon2';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, jwtPayload: RequestUser) {
    const refreshToken = req.body.refreshToken.replace('Bearer', '').trim();
    const user = await this.userRepository.findOneBy({ id: jwtPayload.id });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException();
    }

    const isValidRefreshToken = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!isValidRefreshToken) {
      throw new UnauthorizedException();
    }

    return { id: jwtPayload.id };
  }
}
