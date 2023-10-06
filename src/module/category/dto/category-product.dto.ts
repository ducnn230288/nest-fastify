import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationResponsesDto, DefaultResponsesDto } from '@shared';
import { CategoryProduct } from '@model';

export class CategoryProductDto extends PartialType(OmitType(CategoryProduct, [] as const)) {}

export class CategoryProductResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: CategoryProductDto | null;
}

export class ListCategoryProductResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: CategoryProductDto[];
}

export class CreateCategoryProductRequestDto extends PickType(CategoryProduct, [
  'name',
  'description',
  'slug',
] as const) {}

export class UpdateCategoryProductRequestDto extends PartialType(CreateCategoryProductRequestDto) {}
