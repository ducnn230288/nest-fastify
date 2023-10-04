import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { Store } from '@model';
import { DefaultAuthResponsesUserDto, UserDto } from '@dto';

export class ListStoreResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: StoreDto[];
}

export class UpdateStoreRequestDto extends PickType(Store, [
  'name',
  'status',
  'phone',
  'description',
  'slug',
  'avatar',
] as const) {}

export class CreateStoreRequestDto extends PickType(Store, [
  'name',
  'status',
  'phone',
  'description',
  'slug',
  'avatar',
  // 'userId',
] as const) {}

export class StoreDto extends PartialType(
  OmitType(Store, [
    'isDeleted',
    'createdAt',
    'updatedAt',
    'name',
    'phone',
    'description',
    'slug',
    'avatar',
    'userId',
    'status',
  ] as const),
) {}

export class StoreResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: StoreDto | null;
}
