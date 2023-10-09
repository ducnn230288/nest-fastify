import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

import { Province } from '@model';
import { DistrictDto } from '@dto';

export class ProvinceDto extends PartialType(
  OmitType(Province, ['isDeleted', 'createdAt', 'updatedAt', 'name', 'code'] as const),
) {
  readonly code: string;
}

export class ListProvinceResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: ProvinceDto[];
}
