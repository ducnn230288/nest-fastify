import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { Address } from '@model';
import { DistrictDto, ProvinceDto, WardDto } from '@dto';

export class CreateAddressDto extends PickType(Address, ['specificAddress'] as const) {}
export class UpdateAddressDto extends PickType(Address, ['specificAddress'] as const) {}

export class AddressDto extends PartialType(
    OmitType(Address, ['isDeleted', 'createdAt', 'updatedAt', 'province', 'district', 'ward'] as const),
) {
    readonly province: ProvinceDto;
    readonly district: DistrictDto;
    readonly ward: WardDto;
}
// export class AddressResponseDto extends PartialType(DefaultResponsesDto) {
//     readonly data: AddressDto | null;
// }
export class ListAddressResponseDto extends PartialType(PaginationResponsesDto) {
    readonly data: AddressDto[];
}