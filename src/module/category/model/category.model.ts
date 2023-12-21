import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, Unique } from "typeorm";
import { faker } from '@faker-js/faker';
import { IsString, IsOptional,IsUUID } from 'class-validator';
import { Base } from "@shared";

@Entity()
export class Category extends Base{
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
    @Column({nullable:true})
    code: string;

    @Column({default:true})
    @ApiProperty({
        example: faker.datatype.boolean(),
        description: '',
    })
    isActive: boolean;

    @Column({nullable:true})
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

    @Column({nullable:true})
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    createdById: string;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    orgId: number;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.datatype.boolean(),
        description: '',
    })
    isKiotViet: boolean;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    categoryKiotId: number;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    @IsOptional()
    @IsString()
    @Column({nullable:true,unique:false})
    parentId: string;
    @IsOptional()
    @OneToMany(() => Category, (category) => category.parent)
    @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
    parent: Category
}