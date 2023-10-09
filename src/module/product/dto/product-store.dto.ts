import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { ProductStore } from '@model';
import { DefaultAuthResponsesUserDto, UserDto } from '@dto';

export class ProductUpdateStoreRequestDto extends PickType(ProductStore, [
  'name',
  'status',
  'phone',
  'description',
  'slug',
  'avatar',
] as const) {}

export class ProductCreateStoreRequestDto extends PickType(ProductStore, [
  'name',
  'status',
  'phone',
  'description',
  'slug',
  'avatar',
  // 'userId',
] as const) {}

export class ProductStoreDto extends PartialType(
  OmitType(ProductStore, [
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

export class ProductStoreResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: ProductStoreDto | null;
}

export class ListProductStoreResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: ProductStoreDto[];
}
