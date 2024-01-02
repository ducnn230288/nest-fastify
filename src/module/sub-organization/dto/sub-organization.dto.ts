import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Address, ConnectKiotViet, SubOrganization, User } from '@model';
import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';
import { DetailConnectKiotViet } from '@dto';
import { faker } from '@faker-js/faker';
import { SUPPLIER_TYPE, SubOrgType } from '../enum';

class DetailAddress extends PickType(Address, [
  'codeProvince',
  'codeDistrict',
  'codeWard',
  'specificAddress',
  'postCode',
]) {}
export class CreateSubOrganizationRequestDto extends IntersectionType(
  PickType(SubOrganization, ['name', 'storeId', 'note', 'fax', 'supplierType', 'type']),
  PickType(User, ['email', 'name', 'phoneNumber']),
  PickType(Address, ['codeProvince', 'codeDistrict', 'codeWard', 'specificAddress', 'postCode']),
  PickType(ConnectKiotViet, ['clientId', 'clientSecret', 'retailer', 'branchId']),
) {}
// export class CreateSubOrganizationRequestDto extends PickType(SubOrganization, [
//     'name',
//     'storeId',
//     'note',
//     'fax',
// ]) {

// @IsOptional()
// address: DetailAddress;

//     @IsString()
//     @IsNotEmpty()
//     type: SubOrgType;

//     @IsString()
//     @IsNotEmpty()
//     supplierType: SUPPLIER_TYPE;

//     @IsNotEmpty()
//     @IsString()
//     @ApiProperty({ example: faker.internet.email().toLowerCase(), description: '' })
//     emailContact: string;

//     @IsNotEmpty()
//     @IsString()
//     @ApiProperty({
//         example: faker.person.firstName()
//     })
//     nameContact: string;

//     @IsNotEmpty()
//     @IsString()
//     @ApiProperty({
//         example: faker.phone.number()
//     })
//     phoneNumber: string;

// @IsOptional()
connectKiot: DetailConnectKiotViet;

// }
export class UpdateSubOrganizationDto extends PartialType(CreateSubOrganizationRequestDto) {}
export class UpdateSubOrganizationActiveDto extends PickType(SubOrganization, ['isActive']) {}
export class SuppliersByAdminDto extends PickType(SubOrganization, ['id', 'name', 'supplierType']) {}
export class ListSuppliersByAdmin {
  readonly data: SuppliersByAdminDto[];
}
