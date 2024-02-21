import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '@shared';

import { AddressProvince } from '@model';

export class AddressProvinceDto extends PartialType(
  OmitType(AddressProvince, ['isDeleted', 'createdAt', 'updatedAt', 'name', 'code'] as const),
) {
  readonly code: string;
}

export class ListProvinceResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: AddressProvinceDto[];
}
