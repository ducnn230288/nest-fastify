import { Column, Entity } from "typeorm";
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { faker } from '@faker-js/faker';
import { Base } from "@shared";

@Entity()
export class ConnectKiotViet extends Base {

    @Column()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: faker.string.uuid(),
    })

    clientSecret: string;
    @Column()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: faker.string.uuid(),
    })
    clientId: string;
    @Column()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: faker.string.uuid(),
    })
    retailer: string;
    @Column()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: faker.number.int(),
    })
    branchId: number;
}