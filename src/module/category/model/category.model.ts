import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { faker } from '@faker-js/faker';
import { IsOptional, IsString, MinLength } from 'class-validator';
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({
        example: faker.person.jobType(),
        description: '',
    })
    @IsString()
    name: string;

    @Column()
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    @IsString()
    code: string;

    @Column()
    @ApiProperty({
        example: faker.datatype.boolean(),
        description: '',
    })
    isActive: boolean;

    @Column()
    @ApiProperty({
        example: faker.datatype.boolean(),
        description: '',
    })
    isDeleted: boolean;

    @Column()
    @ApiProperty({
        example: faker.datatype.boolean(),
        description: '',
    })
    isParent: boolean;

    @Column()
    @ApiProperty({
        example: faker.date.recent(),
        description: '',
    })
    createdAt: Date;

    @Column()
    @ApiProperty({
        example: faker.date.recent(),
        description: '',
    })
    updatedAt: Date;

    @Column()
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    createdById: number;

    @Column()
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    orgId: number;

    @Column()
    @ApiProperty({
        example: faker.datatype.boolean(),
        description: '',
    })
    isKiotViet: boolean;

    @Column()
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    categoryKiotId: number;

    @Column()
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    parentId: number;
    @IsOptional()
    @OneToOne(() => Category, (category) => category.parent)
    @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
    parent: Category

    // @ManyToOne(() => Organization, (org) => org.category)
    // @JoinColumn({ name: 'org_id', referencedColumnName: 'id' })
    // org: Organization;

    // @OneToMany(
    //     () => ProductCategory,
    //     (productCategory) => productCategory.category
    // )
    // productCategory: ProductCategory[];
}
