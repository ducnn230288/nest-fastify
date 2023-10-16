import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { Post, PostTranslation } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

export class CreatePostRequestDto extends PickType(Post, ['type', 'thumbnailUrl', 'createdAt', 'isDisabled'] as const) {
  @IsArray()
  translations?: CreatePostTranslationRequestDto[];
}
export class CreatePostTranslationRequestDto extends PickType(PostTranslation, [
  'id',
  'language',
  'name',
  'description',
  'slug',
  'content',
] as const) {}

export class UpdatePostRequestDto extends PartialType(CreatePostRequestDto) {}
export class ArrayPostResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: { [key: string]: Post[] };
}
export class PostDto extends PartialType(
  OmitType(Post, ['isDeleted', 'createdAt', 'updatedAt', 'translations', 'item'] as const),
) {}
export class PostResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: PostDto | null;
}
export class ListPostResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: PostDto[];
}
