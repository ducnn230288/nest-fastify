import { ApiProperty, PickType } from "@nestjs/swagger";
import { Address, SubOrganization } from "@model";
import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';
import { DetailConnectKiotViet } from "@dto";
import { faker } from '@faker-js/faker';
import { SUPPLIER_TYPE, SubOrgType } from "../enum";

class DetailAddress extends PickType(Address, [
    'codeProvince',
    'codeDistrict',
    'codeWard',
    'specificAddress',
    'postCode'
]) {}

export class CreateSubOrganizationRequestDto extends PickType(SubOrganization, [
    'name',
    'storeId',
    'note',
    'fax',
]) {

    @IsOptional()
    address: DetailAddress

    @IsString()
    @IsNotEmpty()
    type: SubOrgType

    @IsString()
    @IsNotEmpty()
    supplierType: SUPPLIER_TYPE

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: faker.internet.email().toLowerCase(), description: '' })
    emailContact: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: faker.person.firstName()
    })
    nameContact: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: faker.phone.number()
    })
    phoneNumber: string;

    @IsOptional()
    connectKiot: DetailConnectKiotViet;

}