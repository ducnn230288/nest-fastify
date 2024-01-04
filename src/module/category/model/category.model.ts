import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Unique } from "typeorm";
import { faker } from '@faker-js/faker';
import { IsString, IsOptional,IsUUID } from 'class-validator';
import { Base } from "@shared";
import { Exclude, Expose } from "class-transformer";

@Entity()
export class Category extends Base{
    @Column()
    @ApiProperty({
        example: faker.person.jobType(),
        description: '',
    })
    @IsString()
    @Expose()
    name: string;

    @Column()
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    @IsString()
    @Column({nullable:true})
    @Exclude()
    code: string;

    @Column({default:true})
    @ApiProperty({
        example: faker.datatype.boolean(),
        description: '',
    })
    @Exclude()
    isActive: boolean;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.datatype.boolean(),
        description: '',
    })
    @Exclude()
    isParent: boolean;

    @Column()
    @ApiProperty({
        example: faker.date.recent(),
        description: '',
    })
    @Exclude()
    createdAt: Date;

    @Column()
    @ApiProperty({
        example: faker.date.recent(),
        description: '',
    })
    @Exclude()
    updatedAt: Date;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    @Exclude()
    createdById: string;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    @Exclude()
    orgId: string;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.datatype.boolean(),
        description: '',
    })
    @Exclude()
    isKiotViet: boolean;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    @Exclude()
    categoryKiotId: number;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    @IsOptional()
    @IsString()
    @Column({nullable:true,unique:false})
    @ApiProperty({ example: faker.string.uuid(), description: '' })
    @Expose()
    parentId: string;
    @IsOptional()
    @ManyToOne(() => Category, (category) => category.parent)
    @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
    parent: Category
}