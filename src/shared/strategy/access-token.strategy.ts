import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { appConfig } from '@config';
import { User } from '@model';
import { UserRepository } from '@repository';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(public readonly repo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.ACCESS_SECRET,
    });
  }

  async validate(payload: { userId: string; email: string }): Promise<User> {
    const user = await this.repo.getDataByIdAndEmailJoinRole(payload.userId, payload.email);
    if (!user || !user.refreshToken) throw new UnauthorizedException();

    return user;
  }
}
