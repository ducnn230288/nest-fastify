import { UserAdmin } from '@model';
import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

export class UserAdminDto extends PartialType(OmitType(UserAdmin, [] as const)) {}

export class UserAdminResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: UserAdminDto | null;
}

export class ListUserAdminResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: UserAdminDto[];
}

export class CreateUserAdminRequestDto extends PickType(UserAdmin, [
  'username',
  'email',
  'phoneNumber',
  'note',
] as const) {}

export class UpdateUserAdminRequestDto extends PartialType(CreateUserAdminRequestDto) {}
