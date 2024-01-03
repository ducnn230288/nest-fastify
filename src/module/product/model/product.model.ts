import { Base } from "@shared";
import { Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { E_APPROVE_STATUS, E_BALANCE_PRICE_TYPE, E_STATUS_TYPE, SUPPLIER_TYPE } from "@enum";
import { ApiProperty } from "@nestjs/swagger";
import { faker } from '@faker-js/faker';
import { IsUUID } from 'class-validator';


export class Product extends Base {

    @Column()
    @ApiProperty({
        example: faker.string.binary(),
    })
    code: string;

    @Column()
    @ApiProperty({
        example: faker.string.alphanumeric({ length: 10, casing: 'upper' })
    })
    barcode: string;

    @Column()
    @ApiProperty({
        example: faker.lorem.text(),
    })
    name: string;

    @Column()
    @ApiProperty({
        example: faker.lorem.text(),
    })
    description: string;

    @Column()
    @ApiProperty({
        example: faker.lorem.text(),
    })
    brand: string;

    @Column()
    isOnlineBusinessWay: boolean;

    @Column()
    status: E_STATUS_TYPE;

    @Column()
    @ApiProperty({
        example: faker.number.int({ min: 0, max: 100 }),
    })
    stockQuantity: number;

    @Column()
    @ApiProperty({
        example : faker.lorem.text(),
    })
    supplierName: string;

    @Column()
    @ApiProperty({
        example : faker.lorem.text(),
    })
    shipmentName: string;

    @Column()
    @ApiProperty({
        example : faker.date.past(),
    })
    expirationDate: Date;

    @Column()
    @ApiProperty({
        example : faker.number.int({ min: 0, max: 100000 }),
    })
    capitalCost: number;

    @Column()
    @ApiProperty({
        example : faker.number.int({ min: 0, max: 100000 }),
    })
    price: number;

    @Column()
    @ApiProperty({
        example : faker.lorem.text(),
    })
    basicUnit: string;

    @Column()
    @IsUUID()
    @ApiProperty({
        example : faker.datatype.uuid(),
    })
    orgId: string;

    @Column()
    @IsUUID()
    @ApiProperty({
        example : faker.datatype.uuid(),
    })
    subOrgId: string;

    @Column()
    @ApiProperty({
        example : faker.datatype.boolean(),
    })
    shipmentAndExpirationDate: boolean;

    @Column()
    approveStatus: E_APPROVE_STATUS;

    @Column()
    @ApiProperty({
        example : faker.date.past(),
    })
    approvedAt: Date;

    @Column()
    @ApiProperty({
        example : faker.date.past(),
    })
    rejectedAt: Date;

    @Column()
    @ApiProperty({
        example : faker.lorem.text(),
    })
    rejectReason: string;

    @Column()
    balancePriceType: E_BALANCE_PRICE_TYPE;

    @Column()
    @IsUUID()
    @ApiProperty({
        example : faker.datatype.uuid(),
    })
    productSupplierId: string;

    @Column()
    hash: string;

    @Column()
    @ApiProperty({
        example : faker.datatype.boolean(),
    })
    isActive: boolean;

    @Column()
    origin: string;

    @Column()
    importTaxId: number;

    @Column()
    exportTaxId: number;

    @Column()
    abilitySupply: string;

    @Column()
    exportMarket: string;

    @Column()
    storeBarcode: string;

    @Column()
    supplierType: SUPPLIER_TYPE;

    @Column()
    productKiotvietId: number

    // @ManyToOne(() => Organization, (org) => org.product)
    // @JoinColumn({ name: 'org_id', referencedColumnName: 'id' })
    // org: Organization;


    // @ManyToOne(() => SubOrganization, (org) => org.product)
    // @JoinColumn({ name: 'sub_org_id', referencedColumnName: 'id' })
    // subOrg: SubOrganization;

    // @OneToMany(
    //     () => ProductCategory,
    //     (productCategory) => productCategory.product
    // )
    // productCategory: ProductCategory[];

    // @OneToMany(() => ProductPhoto, (productPhoto) => productPhoto.product)
    // photos: ProductPhoto[];

    // @OneToMany(() => ProductAttr, (productAttr) => productAttr.product)
    // attrs: ProductAttr[];

    // @OneToMany(() => ProductPrice, (productPrice) => productPrice.product)
    // productPrice: ProductPrice[];

    // @OneToMany(
    //     () => PriceBalanceCommission,
    //     (priceBalanceCommission) => priceBalanceCommission.product
    // )
    // priceBalanceCommission: PriceBalanceCommission[];

    // @OneToMany(
    //     () => StoreRequestSupplierProduct,
    //     (productConnect) => productConnect.product
    // )
    // productConnect: StoreRequestSupplierProduct[];

    // @OneToOne(() => Product, (product) => product.product)
    // @JoinColumn({ name: 'product_supplier_id', referencedColumnName: 'id' })
    // product: Product;

    // @OneToMany(
    //     () => ProductInformation,
    //     (productInformation) => productInformation.product
    // )
    // information: ProductInformation[];

    // @ManyToOne(() => MtTax)
    // @JoinColumn({ name: 'import_tax_id', referencedColumnName: 'id' })
    // importTax: MtTax;

    // @ManyToOne(() => MtTax)
    // @JoinColumn({ name: 'export_tax_id', referencedColumnName: 'id' })
    // exportTax: MtTax;

    // @Column({ type: 'float4' })
    // sellingPrice: number;

    // @OneToMany(() => RetailPrice, (retailPrice) => retailPrice.product)
    // retailPrice: RetailPrice[];
}