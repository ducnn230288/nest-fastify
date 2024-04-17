import { Module } from '@nestjs/common';
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
import {
  AddressDistrictRepository,
  AddressProvinceRepository,
  AddressRepository,
  AddressWardRepository,
  FileRepository,
  UserRepository,
  UserRoleRepository,
} from '@repository';

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
    UserRoleRepository,
    UserRoleService,
    FileRepository,
    FileService,
    AddressProvinceRepository,
    AddressProvinceService,
    AddressDistrictRepository,
    AddressDistrictService,
    AddressWardRepository,
    AddressWardService,
    AddressRepository,
    AddressService,
  ],
  exports: [
    AuthService,
    UserRepository,
    UserService,
    UserRoleRepository,
    UserRoleService,
    FileRepository,
    FileService,
    AddressProvinceRepository,
    AddressProvinceService,
    AddressDistrictRepository,
    AddressDistrictService,
    AddressWardRepository,
    AddressWardService,
    AddressRepository,
    AddressService,
  ],
})
export class UserModule {}
