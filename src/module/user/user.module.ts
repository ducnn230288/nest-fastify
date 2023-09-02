import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { appConfig } from '@config';
import { AuthController, UserController, UserRoleController } from '@controller';
import { User, UserRole } from '@model';
import { AuthService, EmailService, UserRoleService, UserService } from '@service';
import { UserRepository } from '@repository';

import { AccessTokenStrategy } from './strategy/accessToken.strategy';
import { RefreshTokenStrategy } from './strategy/refreshToken.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: appConfig.ID_TOKEN_PUBLIC_KEY_AS_BASE64,
      // privateKey: appConfig.ID_TOKEN_PRIVATE_KEY,
      // publicKey: appConfig.ID_TOKEN_PUBLIC_KEY,
      signOptions: {
        // algorithm: 'RS256',
        // issuer: 'myapp',
        expiresIn: '30m',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, UserRole]),
  ],
  controllers: [AuthController, UserRoleController, UserController],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    EmailService,
    AuthService,
    UserRepository,
    UserService,
    UserRoleService,
  ],
})
export class UserModule {}
