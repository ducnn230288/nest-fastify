import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '@shared';
import { AddressWard } from '@model';

export class WardDto extends PartialType(
  OmitType(AddressWard, ['isDeleted', 'createdAt', 'updatedAt', 'name', 'code', 'codeDistrict'] as const),
) {}

export class ListWardResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: WardDto[];
}
