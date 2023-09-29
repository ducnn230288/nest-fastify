import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

import { Province } from '@model';

// export class CreateProvinceDto extends PickType(Province, ['name', 'code'] as const) {}
// export class UpdateProvinceDto extends PickType(Province, ['name', 'code'] as const) {}

export class ProvinceDto extends PartialType(
    OmitType(Province, ['isDeleted', 'createdAt', 'updatedAt', 'name', 'code'] as const),
) {}

export class ListProvinceResponseDto extends PartialType(PaginationResponsesDto) {
    readonly data: ProvinceDto[];
}