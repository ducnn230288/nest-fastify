import { ApiProperty, PickType } from "@nestjs/swagger";
import { SubOrganization } from "@model";
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ConnectKiotViet } from "@dto";



export class CreateSubOrganizationRequestDto extends PickType(SubOrganization, [
    'name',
    'type',
    'supplierType',
    'address',
    'storeId',
    'note',
    'fax',
]) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'KiotViet',
    })
    emailContact: string;

    @IsNotEmpty()
    @IsString()
    nameContact: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    @IsOptional()
    connectKiot: ConnectKiotViet;

}