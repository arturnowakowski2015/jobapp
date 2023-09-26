import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../constants';
import { RequestUser } from 'src/types/request';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(jwtPayload: RequestUser): Promise<RequestUser> {
    const user = await this.userRepository.findOneBy({ id: jwtPayload.id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: jwtPayload.id };
  }
}
