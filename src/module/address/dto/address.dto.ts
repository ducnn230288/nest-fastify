import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { Address } from '@model';

export class CreateAddressRequestDto extends PickType(Address, [
  'codeProvince',
  'codeDistrict',
  'codeWard',
  'specificAddress',
] as const) {}
export class UpdateAddressRequestDto extends PickType(Address, ['specificAddress'] as const) {}

export class AddressDto extends PartialType(
  OmitType(Address, [
    'isDeleted',
    'createdAt',
    'updatedAt',
    'provinceItem',
    'districtItem',
    'wardItem',
    'specificAddress',
  ] as const),
) {}
export class AddressResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: AddressDto | null;
}
export class ListAddressResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: AddressDto[];
}
