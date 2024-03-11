import { OmitType, PartialType, PickType } from '@nestjs/swagger';

import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { PostType } from '@model';
import { IsOptional, IsString } from 'class-validator';

/**
 * Represents a DTO for creating a new post type.
 */
export class CreatePostTypeRequestDto extends PickType(PostType, ['name', 'code'] as const) {
  @IsString()
  @IsOptional()
  idChildren?: string;
}

/**
 * Represents a DTO for updating an existing post type.
 */
export class UpdatePostTypeRequestDto extends PickType(PostType, ['name', 'code'] as const) {}

/**
 * Represents a DTO for the post type data without certain fields.
 */
export class PostTypeDto extends PartialType(
  OmitType(PostType, ['isDeleted', 'createdAt', 'updatedAt', 'items'] as const),
) {}

/**
 * Represents a DTO for the response containing a single post type.
 */
export class PostTypeResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: PostTypeDto | null;
}

/**
 * Represents a DTO for the response containing a list of post types.
 */
export class ListPostTypeResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: PostTypeDto[];
}
