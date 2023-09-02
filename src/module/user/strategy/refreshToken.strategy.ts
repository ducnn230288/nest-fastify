import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import * as argon2 from 'argon2';

import { appConfig } from '@config';
import { User } from '@model';
import { UserRepository } from '@repository';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly repo: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any): Promise<User> {
    const user = await this.repo.getDataByIdAndEmail(payload.userId, payload.email);
    const authorization = req.get ? req.get('Authorization') : '';
    if (!user || !user.refreshToken || !authorization) throw new UnauthorizedException();

    const refreshTokenMatches = await argon2.verify(user.refreshToken, authorization.replace('Bearer', '').trim());
    if (!refreshTokenMatches) throw new UnauthorizedException();

    return user;
  }
}
