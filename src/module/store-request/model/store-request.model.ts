import { ApiProperty } from "@nestjs/swagger";
import { Base } from "@shared";
import { Column, Entity } from "typeorm";
import { faker } from '@faker-js/faker';
import { IsString, IsBoolean, IsUUID } from 'class-validator';

@Entity()
export class StoreRequest extends Base {

    @Column({
        nullable: true
    })
    @IsString()
    @ApiProperty({
        example: faker.string.alpha,
    })
    code: string;

    @Column()
    @IsString()
    @ApiProperty({
        example: faker.lorem.text,
    })
    productName: string;

    @Column()
    @IsString()
    @ApiProperty({
        example: faker.lorem.text,
    })
    description: string;

    @Column({
        default: true
    })
    @IsBoolean({
        message: 'Status must be boolean'
    })
    @ApiProperty({
        example: faker.datatype.boolean
    })
    status: string;

    @Column()
    @IsString()
    @ApiProperty({
        example: faker.lorem.text,
    })
    note: string;

    @Column({
        nullable: true
    })
    @IsString()
    @ApiProperty({
        example: faker.lorem.text,
    })
    reason: string;

    @Column({
        nullable: true
    })
    @ApiProperty({
        example: faker.number.int({ min: 1, max: 10 }),
    })
    createdById: number;

    @Column({
        nullable: true
    })
    @ApiProperty({
        example: faker.number.int({ min: 1, max: 10 }),
    })
    updatedById: number;

    @Column({
        nullable: true
    })
    @IsUUID()
    @ApiProperty({
        example: faker.string.uuid,
    })
    storeId: number;

    @Column({
        default: new Date()
    })
    @ApiProperty({
        example: faker.date.past(),
    })
    requestedAt: Date;

    @Column({
        default: new Date()
    })
    @ApiProperty({
        example: faker.date.past(),
    })
    approvedAt: Date;
}