import { PartialType, PickType } from "@nestjs/swagger";
import { Store } from "@model";
import { DefaultResponsesDto, PaginationResponsesDto } from "@shared";

export class CreateStoreRequestDto extends PickType(Store, [
    'name',
    'phone',
    'status',
    'description',
    'slug',
    'avatar',
    'userId'
] as const) { }

export class UpdateStoreRequestDto extends PartialType(CreateStoreRequestDto) { }

export class DefaultStoreResponseDto extends PickType(Store, [
    'name',
    'phone',
    'status',
    'description',
    'slug',
    'avatar',
    'user'
] as const) { }

export class ListStoreResponseDto extends PartialType(PaginationResponsesDto) {
    readonly data: Store[]
}

export class StoreResponseDto extends PartialType(DefaultResponsesDto) {
    readonly data: DefaultStoreResponseDto | null;
}