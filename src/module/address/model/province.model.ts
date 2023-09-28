import { ApiProperty } from "@nestjs/swagger";
import { Base } from "@shared";
import { Column, Entity, OneToOne } from "typeorm";
import { faker } from '@faker-js/faker';
import { IsString } from 'class-validator';
import { Expose } from "class-transformer";
import { Address } from "./address.model";


@Entity()
export class Province extends Base {
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

    @OneToOne(() => Address)
    address: Address;
}
