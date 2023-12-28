import { Base } from "@shared";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IsString, IsNumber, IsBoolean, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { faker } from '@faker-js/faker';
import { Category, Store } from "@model";

@Entity()
export class Product extends Base {
    @Column()
    @ApiProperty({ example: faker.commerce.productName(), description: '' })
    @IsString()
    name: string;

    @Column({ nullable: true })
    @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
    @IsOptional()
    @IsString()
    description?: string;

    @Column()
    @ApiProperty({ example: faker.number.int({ min: 0, max: 1000 }), description: '' })
    @Min(0)
    @IsNumber()
    quantity: number;

    @Column()
    @ApiProperty({ example: faker.number.int({ min: 0, max: 1000000 }), description: '' })
    @Min(0)
    @IsNumber()
    price: number;

    @Column({ nullable: true })
    @ApiProperty({ example: faker.image.url(), description: '' })
    @IsOptional()
    @IsString()
    images: string;

    @Column({ default: true })
    @ApiProperty({ example: true, description: '' })
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @Column()
    @ApiProperty({ example: faker.lorem.slug(), description: '' })
    @IsOptional()
    @IsString()
    slug?: string;

    @Column({ type: "float" })
    @ApiProperty({ example: faker.number.float({ min: 0, max: 100, precision: 0.1 }), description: '' })
    @Min(0)
    @IsNumber()
    mass: number;

    @Column({ nullable: true, type: "float" })
    @ApiProperty({ example: faker.number.float({ min: 0, max: 99, precision: 0.1 }), description: '' })
    @IsOptional()
    @Min(0)
    @Max(99)
    @IsNumber()
    discountPrice?: number;

    @Column({ name: 'category_id' })
    @ApiProperty({ example: faker.string.uuid(), description: '' })
    @IsOptional()
    categoryId?: string;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    category: Category;

    @Column({ name: 'store_id' })
    @ApiProperty({ example: faker.string.uuid(), description: '' })
    @IsOptional()
    storeId?: string;

    @ManyToOne(() => Store, (store) => store.products)
    @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
    store: Store;
}