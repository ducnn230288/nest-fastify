import { OmitType, PartialType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { Store } from '@model';
import { DefaultAuthResponsesUserDto, UserDto } from '@dto';

export class ListStoreResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: StoreDto[];
}

export class StoreDto extends PartialType(
  OmitType(Store, [
    'isDeleted',
    'createdAt',
    'updatedAt',
    'name',
    'status',
    'phone',
    'description',
    'slug',
    'avatar',
    'userId',
  ] as const),
) {
  readonly userId: UserDto;
}

export class StoreResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: DefaultAuthResponsesUserDto | null;
}
