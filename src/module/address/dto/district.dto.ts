import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { District } from '@model';

// export class CreateDistrictDto extends PickType(District, ['code', 'name'] as const) {}
// export class UpdateDistrictDto extends PickType(District, ['name'] as const) {}

export class DistrictDto extends PartialType(
    OmitType(District, ['isDeleted', 'createdAt', 'updatedAt', 'name', 'code'] as const),
) {}

export class ListDistrictResponseDto extends PartialType(PaginationResponsesDto) {
    readonly data: DistrictDto[];
}
