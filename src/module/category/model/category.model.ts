import { Base } from "@shared";
import { Column, JoinColumn, ManyToOne, Entity, OneToMany } from 'typeorm';
import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { faker } from '@faker-js/faker';
import { Type } from "class-transformer";

@Entity()
export class Category extends Base {
    @Column()
    @ApiProperty({ example: faker.commerce.productName(), description: '' })
    @IsString()
    name: string;

    @Column({ default: false, name: 'is_parent' })
    @ApiProperty({ example: false, description: '' })
    @IsBoolean()
    isParent: boolean;

    @Column()
    @IsString()
    createdById: string;

    @Column({ nullable: true, type: 'varchar', name: 'parent_id' })
    @IsOptional()
    @IsString()
    parentId?: string;

    @ManyToOne(() => Category, (category) => category.listCategory)
    @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
    @Type(() => Category)
    readonly parent?: Category;

    @OneToMany(() => Category, (category) => category.parent)
    listCategory?: Category[];
}