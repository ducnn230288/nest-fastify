import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '@shared';
import { AddressDistrict } from '@model';

export class AddressDistrictDto extends PartialType(
  OmitType(AddressDistrict, ['isDeleted', 'createdAt', 'updatedAt', 'name', 'code', 'codeProvince'] as const),
) {
  readonly code: string;
}

export class ListDistrictResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: AddressDistrictDto[];
}
