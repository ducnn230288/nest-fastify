import { Base } from "@shared";
import { Column } from "typeorm";
import { E_APPROVE_STATUS, E_BALANCE_PRICE_TYPE, E_STATUS_TYPE } from "@enum";


export class Product extends Base {
    @Column()
    code: string;

    @Column()
    barcode: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    brand: string;

    @Column()
    isOnlineBusinessWay: boolean;

    @Column()
    status: E_STATUS_TYPE;

    @Column()
    stockQuantity: number;

    @Column()
    supplierName: string;

    @Column()
    shipmentName: string;

    @Column()
    expirationDate: Date;

    @Column()
    capitalCost: number;

    @Column()
    price: number;

    @Column()
    basicUnit: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    orgId: number;

    @Column()
    subOrgId: number;


    shipmentAndExpirationDate: boolean;

    @Column()
    approveStatus: E_APPROVE_STATUS;

    @Column()
    approvedAt: Date;

    @Column()
    rejectedAt: Date;

    @Column()
    rejectReason: string;

    @Column()
    balancePriceType: E_BALANCE_PRICE_TYPE;

    @Column()
    productSupplierId: number;

    @Column()
    hash: string;

    @Column()
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

    @ManyToOne(() => Organization, (org) => org.product)
    @JoinColumn({ name: 'org_id', referencedColumnName: 'id' })
    org: Organization;

    @ManyToOne(() => SubOrganization, (org) => org.product)
    @JoinColumn({ name: 'sub_org_id', referencedColumnName: 'id' })
    subOrg: SubOrganization;

    @OneToMany(
        () => ProductCategory,
        (productCategory) => productCategory.product
    )
    productCategory: ProductCategory[];

    @OneToMany(() => ProductPhoto, (productPhoto) => productPhoto.product)
    photos: ProductPhoto[];

    @OneToMany(() => ProductAttr, (productAttr) => productAttr.product)
    attrs: ProductAttr[];

    @OneToMany(() => ProductPrice, (productPrice) => productPrice.product)
    productPrice: ProductPrice[];

    @OneToMany(
        () => PriceBalanceCommission,
        (priceBalanceCommission) => priceBalanceCommission.product
    )
    priceBalanceCommission: PriceBalanceCommission[];

    @OneToMany(
        () => StoreRequestSupplierProduct,
        (productConnect) => productConnect.product
    )
    productConnect: StoreRequestSupplierProduct[];

    @OneToOne(() => Product, (product) => product.product)
    @JoinColumn({ name: 'product_supplier_id', referencedColumnName: 'id' })
    product: Product;

    @OneToMany(
        () => ProductInformation,
        (productInformation) => productInformation.product
    )
    information: ProductInformation[];

    @ManyToOne(() => MtTax)
    @JoinColumn({ name: 'import_tax_id', referencedColumnName: 'id' })
    importTax: MtTax;

    @ManyToOne(() => MtTax)
    @JoinColumn({ name: 'export_tax_id', referencedColumnName: 'id' })
    exportTax: MtTax;

    @Column({ type: 'float4' })
    sellingPrice: number;

    @OneToMany(() => RetailPrice, (retailPrice) => retailPrice.product)
    retailPrice: RetailPrice[];
}