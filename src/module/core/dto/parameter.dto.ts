import { OmitType, PartialType, PickType } from '@nestjs/swagger';

import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { Parameter } from '@model';

export class CreateParameterRequestDto extends PickType(Parameter, ['code', 'vn', 'en'] as const) {}
export class UpdateParameterRequestDto extends PartialType(CreateParameterRequestDto) {}

export class ParameterDto extends PartialType(OmitType(Parameter, ['isDeleted', 'createdAt', 'updatedAt'] as const)) {}
export class ParameterResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: ParameterDto | null;
}
export class ListParameterResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: ParameterDto[];
}
