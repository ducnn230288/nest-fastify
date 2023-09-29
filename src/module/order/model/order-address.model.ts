import { faker } from "@faker-js/faker";
import { Address, District, Order, Province, Ward } from "@model";
import { ApiProperty } from "@nestjs/swagger";
import { Base } from "@shared";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

 
@Entity()
export class OrderAddress extends Base {

    @Column()
    @ApiProperty({ example: faker.datatype.uuid(), description: '' })
    @IsUUID()
    @Type(() => String)
    wardId: string;

    @OneToOne(() => Ward, (ward) => ward.id)
    @JoinColumn()
    @Type(() => Ward)
    readonly ward?: Ward

    @Column()
    @ApiProperty({ example: faker.datatype.uuid(), description: '' })
    @IsUUID()
    @Type(() => String)
    districtId: string;

    @OneToOne(() => District, (district) => district.id)
    @JoinColumn()
    @Type(() => District)
    readonly district?: District

    @Column()
    @ApiProperty({ example: faker.datatype.uuid(), description: '' })
    @IsUUID()
    @Type(() => String)
    provinceId: string;

    @OneToOne(() => Province, (province) => province.id)
    @JoinColumn()
    @Type(() => Province)
    readonly province?: Province

    @Column()
    @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
    @IsString()
    @Type(() => String)
    @IsOptional()
    specificAddress?: string

    @Column()
    @ApiProperty({ example: faker.datatype.uuid(), description: '' })
    @IsUUID()
    @Type(() => String)
    orderId: string;

    @OneToOne(() => Order, (order) => order.id)
    @Type(() => Order)
    readonly order?: Order;

    @Column()
    @ApiProperty({ example: faker.datatype.uuid(), description: '' })
    @IsUUID()
    @Type(() => String)
    addressId: string;

    @OneToOne(() => Address, (address) => address.id)
    @Type(() => Address)
    readonly address?: Address


}