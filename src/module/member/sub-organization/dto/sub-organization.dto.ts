import { ApiProperty, PickType } from "@nestjs/swagger";
import {  Address, SubOrganization } from "@model";
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ConnectKiotViet } from "@dto";
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
    // 'address',
    'storeId',
    'note',
    'fax',
]) {

    address : DetailAddress

    @IsString()
    @IsNotEmpty()
    type : SubOrgType

    @IsString()
    @IsNotEmpty()
    supplierType : SUPPLIER_TYPE

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: faker.internet.email()
    })
    emailContact: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: faker.name.firstName()
    })
    nameContact: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: faker.phone.number()
    })
    phoneNumber: string;

    @IsOptional()
    connectKiot: ConnectKiotViet;

}