import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '@shared';
import { District } from '@model';
import { WardDto } from '@dto';

export class DistrictDto extends PartialType(
  OmitType(District, ['isDeleted', 'createdAt', 'updatedAt', 'name', 'code', 'codeProvince'] as const),
) {
  readonly code: string;
}

export class ListDistrictResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: DistrictDto[];
}
