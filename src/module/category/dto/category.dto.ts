import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationResponsesDto, DefaultResponsesDto } from '@shared';
import { Category } from '@model';

export class CategoryDto extends PartialType(OmitType(Category, [] as const)) {}

export class CategoryResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: CategoryDto | null;
}

export class ListCategoryResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: CategoryDto[];
}

export class CreateCategoryRequestDto extends PickType(Category, ['name', 'description', 'slug'] as const) {}

export class UpdateCategoryRequestDto extends PartialType(CreateCategoryRequestDto) {}