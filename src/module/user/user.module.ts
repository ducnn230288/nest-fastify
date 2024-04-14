import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { appConfig } from '@config';
import {
  AddressController,
  AuthController,
  AddressDistrictController,
  AddressProvinceController,
  UserController,
  UserRoleController,
  AddressWardController,
} from '@controller';
import { Address, AddressDistrict, AddressProvince, User, UserRole, AddressWard } from '@model';
import {
  AddressService,
  AuthService,
  AddressDistrictService,
  // EmailService,
  FileService,
  AddressProvinceService,
  UserRoleService,
  UserService,
  AddressWardService,
} from '@service';
import { FileRepository, UserRepository, DayoffRepository, UserTeamRepository } from '@repository';

import { AccessTokenStrategy, RefreshTokenStrategy } from '@shared';

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
    TypeOrmModule.forFeature([User, UserRole, AddressProvince, AddressDistrict, AddressWard, Address]),
  ],
  controllers: [
    AuthController,
    UserRoleController,
    UserController,
    AddressProvinceController,
    AddressDistrictController,
    AddressWardController,
    AddressController,
  ],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    // EmailService,
    AuthService,
    UserRepository,
    UserService,
    UserRoleService,
    FileRepository,
    FileService,
    AddressProvinceService,
    AddressDistrictService,
    AddressWardService,
    AddressService,
    UserTeamRepository,
    DayoffRepository,
  ],
  exports: [
    AuthService,
    UserRepository,
    UserService,
    UserRoleService,
    FileRepository,
    FileService,
    AddressProvinceService,
    AddressDistrictService,
    AddressWardService,
    AddressService,
  ],
})
export class UserModule {}
