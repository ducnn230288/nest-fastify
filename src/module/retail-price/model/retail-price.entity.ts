import { Base, MaxGroup } from "@shared";
import { Expose } from "class-transformer";
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
    unit: string;

    @Column({ type: 'numeric' })
    @Expose({ groups: [MaxGroup] })
    coefficient: number;

    @Column({ type: 'numeric' })
    @Expose({ groups: [MaxGroup] })
    price: number;

    @Column()
    @Expose({ groups: [MaxGroup] })
    barcode: string;

    @Column()
    @Expose({ groups: [MaxGroup] })
    code: string;

    @Column()
    @Expose({ groups: [MaxGroup] })
    basePrice: number;  // add by Tuấn

    @Column({default:true})
    isActive: boolean;  // add by Tuấn
}