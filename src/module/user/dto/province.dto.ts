import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '@shared';

import { Province } from '@model';

export class ProvinceDto extends PartialType(
  OmitType(Province, ['isDeleted', 'createdAt', 'updatedAt', 'name', 'code'] as const),
) {
  readonly code: string;
}

export class ListProvinceResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: ProvinceDto[];
}
