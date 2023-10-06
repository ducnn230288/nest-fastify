import { ApiProperty } from "@nestjs/swagger";
import { Base, MaxGroup } from "@shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Unique } from "typeorm";
import { faker } from '@faker-js/faker';
import { IsString } from 'class-validator';
import { Expose } from "class-transformer";
import { Address, OrderAddress } from "@model";
import { District } from "@model";


@Entity()
@Unique(['code'])
export class Ward extends Base {
    @Column()
    @ApiProperty({ example: faker.person.jobType(), description: '' })
    @Expose()
    @IsString()
    name: string;

    @Column()
    @ApiProperty({ example: faker.finance.bic(), description: '' })
    @Expose()
    @IsString()
    code: string;

    @Column()
    @ApiProperty({ example: faker.finance.bic(), description: '' })
    @Expose()
    @IsString()
    codeDistrict: string;

    @OneToMany(() => Address, address => address.wardItem, { eager: false })
    @Expose({ groups: [MaxGroup] })
    item?: Address;

    @ManyToOne(() => District, district => district.wardItem, { eager: false })
    @JoinColumn({ name: 'codeDistrict', referencedColumnName: 'code' })
    public districtItem?: District;

    @OneToMany(() => OrderAddress, orderAddress => orderAddress.ward, { eager: false })
    @Expose({ groups: [MaxGroup] })
    orderAddress?: OrderAddress;
}
