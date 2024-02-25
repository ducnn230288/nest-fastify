import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

import { CodeDto, UserRoleDto } from '@dto';
import { User } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto, Example } from '@shared';

export class LoginAuthRequestDto extends PickType(User, ['email', 'password'] as const) {}
export class RegisterAuthRequestDto extends PickType(User, [
  'name',
  'password',
  'email',
  'phoneNumber',
  'dob',
  'description',
  'startDate',
] as const) {
  @MinLength(6)
  @ApiProperty({ example: Example.password, description: '' })
  readonly retypedPassword: string;
}
export class ContactRequestDto extends PickType(User, ['email', 'phoneNumber', 'description'] as const) {
  @ApiProperty({ example: faker.person.firstName(), description: '' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: faker.person.lastName(), description: '' })
  @IsString()
  readonly lastName: string;
}
export class ProfileAuthRequestDto extends PickType(User, [
  'name',
  'password',
  'email',
  'phoneNumber',
  'dob',
  'positionCode',
  'description',
  'avatar',
] as const) {
  @ApiProperty({ example: Example.password, description: '' })
  @IsString()
  @IsOptional()
  retypedPassword: string;

  @ApiProperty({ example: Example.password, description: '' })
  @IsString()
  @IsOptional()
  passwordOld: string;
}
export class ForgottenPasswordAuthRequestDto extends PickType(User, ['email'] as const) {
  @IsOptional()
  notSendEmail: boolean;
}
export class OTPConfirmationAuthRequestDto extends PickType(User, ['email', 'otp'] as const) {}
export class RestPasswordAuthRequestDto extends PickType(User, ['email', 'otp', 'password'] as const) {
  @MinLength(6)
  @ApiProperty({ example: Example.password, description: '' })
  readonly retypedPassword: string;
}

export class DefaultAuthResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: AuthDto;
}
export class DefaultForgottenPasswordResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: string | boolean;
}

export class AuthDto {
  user: DefaultAuthResponsesUserDto;

  @ApiProperty({ example: Example.token, description: '' })
  readonly accessToken: string;

  @ApiProperty({ example: Example.token, description: '' })
  readonly refreshToken: string;
}
export class DefaultAuthResponsesUserDto extends PartialType(
  OmitType(User, ['password', 'position', 'role'] as const),
) {
  readonly position?: CodeDto;
  readonly role?: UserRoleDto;
}
export class ProfileAuthResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: DefaultAuthResponsesUserDto;
}

export class CreateUserRequestDto extends PickType(User, [
  'password',
  'name',
  'email',
  'phoneNumber',
  'dob',
  'startDate',
  'positionCode',
  'description',
  'avatar',
  'dateLeave',
  'roleCode',
  'managerId',
  'teams',
] as const) {
  @MinLength(6)
  @ApiProperty({ example: Example.password, description: '' })
  retypedPassword: string;

  @ApiProperty({ example: [faker.string.uuid()], description: '' })
  @IsOptional()
  teamsId?: string[];
}

export class UpdateUserRequestDto extends PickType(User, [
  'name',
  'email',
  'phoneNumber',
  'dob',
  'startDate',
  'positionCode',
  'description',
  'avatar',
  'dateLeave',
  'roleCode',
  'managerId',
  'teams',
  'dateOff',
  'isDisabled',
] as const) {
  @ApiProperty({ example: [faker.string.uuid()], description: '' })
  @IsOptional()
  teamsId?: string[];
}

export class ListUserResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: User[];
}
export class UserDto extends PartialType(
  OmitType(User, ['isDeleted', 'createdAt', 'updatedAt', 'password', 'position', 'role'] as const),
) {
  readonly position: CodeDto;
  readonly role: UserRoleDto;
}

export class UserResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: DefaultAuthResponsesUserDto | null;
}
