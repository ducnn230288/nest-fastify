import { OmitType, PartialType, PickType } from '@nestjs/swagger';

import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { DataType } from '@model';

export class CreateDataTypeRequestDto extends PickType(DataType, ['name', 'code'] as const) {}
export class UpdateDataTypeRequestDto extends PickType(DataType, ['name'] as const) {}

export class DataTypeDto extends PartialType(
  OmitType(DataType, ['isDeleted', 'createdAt', 'updatedAt', 'items'] as const),
) {}
export class DataTypeResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: DataTypeDto | null;
}
export class ListDataTypeResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: DataTypeDto[];
}
