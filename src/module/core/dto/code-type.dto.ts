import { OmitType, PartialType, PickType } from '@nestjs/swagger';

import { CodeDto } from '@dto';
import { CodeType } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

/**
 * DTO for creating a new code type.
 */
export class CreateCodeTypeRequestDto extends PickType(CodeType, ['name', 'code'] as const) {}

/**
 * DTO for updating an existing code type.
 */
export class UpdateCodeTypeRequestDto extends PickType(CodeType, ['name'] as const) {}

/**
 * DTO for retrieving code type details.
 */
export class CodeTypeDto extends PartialType(
  OmitType(CodeType, ['isDeleted', 'createdAt', 'updatedAt', 'items'] as const),
) {}

/**
 * DTO for response containing a single code type.
 */
export class CodeTypeResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: CodeTypeDto | null;
}

/**
 * DTO for response containing a list of code types.
 */
export class ListCodeTypeResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: CodeTypeDto[];
}

/**
 * DTO for retrieving code type relationships with related codes.
 */
export class CodeTypeRelationshipDto extends PartialType(
  OmitType(CodeType, ['isDeleted', 'createdAt', 'updatedAt', 'items'] as const),
) {
  readonly items?: CodeDto[];
}

/**
 * DTO for response containing code type relationships with related codes.
 */
export class CodeTypeRelationshipResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: CodeTypeRelationshipDto | null;
}
