import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '@shared';
import { Category, Product } from '@model';

export class ProductDto extends PartialType(OmitType(Category, ['isDeleted', 'createdAt', 'updatedAt'] as const)) {}

export class ListProductResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: ProductDto[];
}
