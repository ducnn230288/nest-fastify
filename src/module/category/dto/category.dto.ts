import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '@shared';
import { Category } from '../model/category.model';

export class CategoryDto extends PartialType(OmitType(Category, ['isDeleted', 'createdAt', 'updatedAt'] as const)) {}

export class ListCategoryResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: CategoryDto[];
}
