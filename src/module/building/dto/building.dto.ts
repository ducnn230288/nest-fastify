import { OmitType, PartialType, PickType } from '@nestjs/swagger';

import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { Building } from '@model';

export class CreateBuildingRequestDto extends PickType(Building, [] as const) {}
export class UpdateBuildingRequestDto extends PartialType(CreateBuildingRequestDto) {}

export class BuildingDto extends PartialType(OmitType(Building, ['isDeleted'] as const)) {}
export class BuildingResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: BuildingDto | null;
}
export class ListBuildingResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: BuildingDto[];
}
