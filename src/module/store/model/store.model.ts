import { Product, User } from "@model";
import { Base } from "@shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { faker } from '@faker-js/faker';
import { Exclude, Expose, Type } from "class-transformer";

@Entity()
export class Store extends Base {
    @Column()
    @ApiProperty({ example: faker.company.name(), description: '' })
    @IsString()
    name: string;

    @Column({ default: true })
    @ApiProperty({ example: faker.phone.number(), description: '' })
    @IsOptional()
    @IsString()
    phone?: string;

    @Column({ default: true })
    @ApiProperty({ example: true, description: '' })
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @Column({ nullable: true })
    @Expose()
    @ApiProperty({ example: faker.lorem.paragraph, description: '' })
    @IsOptional()
    @IsString()
    description?: string;

    @Column()
    @ApiProperty({ example: faker.lorem.slug, description: '' })
    @IsOptional()
    @IsString()
    slug?: string;

    @Column({ nullable: true })
    @ApiProperty({ example: faker.image.url(), description: '' })
    @IsOptional()
    @IsString()
    avatar?: string;

    @Column({ name: 'user_id' })
    @ApiProperty({ example: faker.string.uuid(), description: '' })
    @IsString()
    userId?: string;

    @ManyToOne(() => User, (user) => user.stores)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @Type(() => User)
    user: User;

    @OneToMany(() => Product, (product) => product.store)
    products: Product[];
}