import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { Product } from '@model';

export class ProductDto extends PartialType(OmitType(Product, ['isDeleted', 'createdAt', 'updatedAt'] as const)) {}

export class ProductResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: ProductDto | null;
}

export class ListProductResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: ProductDto[];
}

export class CreateProductTypeRequestDto extends PickType(Product, [
  'name',
  'description',
  'quantity',
  'price',
  'images',
  'slug',
  'mass',
  'categoryId',
] as const) {}
