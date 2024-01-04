import { ApiProperty } from "@nestjs/swagger";
import { Base, MaxGroup } from "@shared";
import { Column, Entity } from "typeorm";
import { faker } from '@faker-js/faker';
import { IsString, IsBoolean, IsUUID } from 'class-validator';
import { E_APPROVE_STATUS } from "@enum";
import { Expose } from 'class-transformer';

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
    @IsString()
    @ApiProperty({
        example: E_APPROVE_STATUS.APPROVED,
    })
    status: string;

    @Column()
    @IsString()
    @ApiProperty({
        example: faker.lorem.text,
    })
    @Expose({ groups: [MaxGroup] })
    note: string;

    @Column({
        nullable: true
    })
    @IsString()
    @ApiProperty({
        example: faker.lorem.text,
    })
    @Expose({ groups: [MaxGroup] })
    reason: string;

    @Column({
        nullable: true
    })
    @ApiProperty({
        example: faker.number.int({ min: 1, max: 10 }),
    })
    @Expose({ groups: [MaxGroup] })
    createdById: number;

    @Column({
        nullable: true
    })
    @ApiProperty({
        example: faker.number.int({ min: 1, max: 10 }),
    })
    @Expose({ groups: [MaxGroup] })
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
    @Expose({ groups: [MaxGroup] })
    requestedAt: Date;

    @Column({
        default: new Date()
    })
    @ApiProperty({
        example: faker.date.past(),
    })
    @Expose()
    approvedAt: Date;
}