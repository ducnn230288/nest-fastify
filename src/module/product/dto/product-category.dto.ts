import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationResponsesDto, DefaultResponsesDto } from '@shared';
import { ProductCategory } from '@model';

export class ProductCategoryDto extends PartialType(OmitType(ProductCategory, [] as const)) {}

export class ProductCategoryResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: ProductCategoryDto | null;
}

export class ListProductCategoryResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: ProductCategoryDto[];
}

export class CreateProductCategoryRequestDto extends PickType(ProductCategory, [
  'name',
  'description',
  'slug',
  'image',
] as const) {}

export class UpdateProductCategoryRequestDto extends PartialType(CreateProductCategoryRequestDto) {}
