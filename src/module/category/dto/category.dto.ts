import { PartialType, PickType } from "@nestjs/swagger";
import { Category } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto } from "@shared";

export class CreateCategoryRequestDto extends PickType(Category, ['name', 'parentId'] as const) {
}

export class UpdateCategoryRequestDto extends PartialType(CreateCategoryRequestDto) {
    readonly isDisabled?: Date | null;
}

export class CreateCategoryWithUserRequestDto extends PartialType(CreateCategoryRequestDto) {
    readonly createdById: string;
}

export class ListCategoryResponseDto extends PartialType(PaginationResponsesDto) {
    readonly data: Category[];
}

export class DefaultCategoryResponseDto extends PickType(Category, [
    'name',
    'isParent',
    'createdAt',
    'updatedAt',
    'isDisabled',
    'isDeleted',
    'parent',
] as const) { }

export class CategoryResponseDto extends PartialType(DefaultResponsesDto) {
    readonly data: DefaultCategoryResponseDto | null;
}