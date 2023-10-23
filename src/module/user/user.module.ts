import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { appConfig } from '@config';
import {
  AuthController,
  DistrictController,
  ProvinceController,
  UserController,
  UserRoleController,
  WardController,
} from '@controller';
import { District, Province, User, UserRole, Ward } from '@model';
import {
  AuthService,
  DistrictService,
  EmailService,
  FileService,
  ProvinceService,
  UserRoleService,
  UserService,
  WardService,
} from '@service';
import { FileRepository, UserRepository } from '@repository';

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
    TypeOrmModule.forFeature([User, UserRole, Province, District, Ward]),
  ],
  controllers: [
    AuthController,
    UserRoleController,
    UserController,
    ProvinceController,
    DistrictController,
    WardController,
  ],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    EmailService,
    AuthService,
    UserRepository,
    UserService,
    UserRoleService,
    FileRepository,
    FileService,
    ProvinceService,
    DistrictService,
    WardService,
  ],
  exports: [
    AuthService,
    UserRepository,
    UserService,
    UserRoleService,
    FileRepository,
    FileService,
    ProvinceService,
    DistrictService,
    WardService,
  ],
})
export class UserModule {}
