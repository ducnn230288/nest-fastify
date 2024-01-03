import { ApiProperty } from "@nestjs/swagger";
import { Base, MaxGroup } from "@shared";
import { Expose } from "class-transformer";
import { faker } from '@faker-js/faker';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class RetailPrice extends Base{
    // @Column()
    // productId: number;
    // @ManyToOne(() => Product, (product) => product.retailPrice)
    // @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    // product: Product;

    @Column()
    @Expose({ groups: [MaxGroup] })
    @ApiProperty({
        example: faker.person.jobType(),
        description: '',
    })
    unit: string;

    @Column({ type: 'numeric' })
    @ApiProperty({
        example: faker.number.int(),
        description: '',
    })
    @Expose({ groups: [MaxGroup] })
    coefficient: number;

    @Column({ type: 'numeric' })
    @ApiProperty({
        example: faker.commerce.price(),
        description: '',
    })
    @Expose({ groups: [MaxGroup] })
    price: number;

    @Column()
    @Expose({ groups: [MaxGroup] })
    @ApiProperty({
        example: faker.person.jobType(),
        description: '',
    })
    barcode: string;

    @Column()
    @Expose({ groups: [MaxGroup] })
    @ApiProperty({
        example: faker.person.jobType(),
        description: '',
    })
    code: string;

    @Column()
    @Expose({ groups: [MaxGroup] })
    @ApiProperty({
        example: faker.commerce.price(),
        description: '',
    })
    basePrice: number;  // add by Tuấn

    @Column({default:true})
    isActive: boolean;  // add by Tuấn
}