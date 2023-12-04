import { OmitType, PartialType, PickType } from '@nestjs/swagger';

import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { PostType } from '@model';

export class CreatePostTypeRequestDto extends PickType(PostType, ['name', 'code'] as const) {}
export class UpdatePostTypeRequestDto extends PickType(PostType, ['name', 'code'] as const) {}

export class PostTypeDto extends PartialType(
  OmitType(PostType, ['isDeleted', 'createdAt', 'updatedAt', 'items'] as const),
) {}
export class PostTypeResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: PostTypeDto | null;
}
export class ListPostTypeResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: PostTypeDto[];
}
