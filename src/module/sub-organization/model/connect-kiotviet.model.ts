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
        example: faker.datatype.uuid(),
    })

    clientSecret: string;
    @Column()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: faker.datatype.uuid(),
    })
    clientId: string;
    @Column()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: faker.datatype.uuid(),
    })
    retailer: string;
    @Column()
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: faker.datatype.number(),
    })
    branchId: number;
}