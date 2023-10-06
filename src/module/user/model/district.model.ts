import { ApiProperty } from "@nestjs/swagger";
import { Base, MaxGroup } from "@shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Unique } from "typeorm";
import { faker } from '@faker-js/faker';
import { IsString, IsArray } from 'class-validator';
import { Expose } from "class-transformer";
import { Address } from "@model";
import { Province, Ward } from "@model";


@Entity()
@Unique(['code'])
export class District extends Base {
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
    codeProvince: string;

    @OneToMany(() => Address, address => address.districtItem, { eager: false })
    @Expose({ groups: [MaxGroup] })
    item?: Address;

    @ManyToOne(() => Province, province => province.districtItem, { eager: false })
    @JoinColumn({ name: 'codeProvince', referencedColumnName: 'code' })
    public provinceItem?: Province;

    @OneToMany(() => Ward, ward => ward.districtItem, { eager: false })
    @Expose({ groups: [MaxGroup] })
    wardItem?: Ward[];
}
