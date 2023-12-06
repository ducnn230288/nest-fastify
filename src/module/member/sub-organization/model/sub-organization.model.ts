import { ApiProperty } from "@nestjs/swagger";
import { Base } from "@shared"
import { Column, Entity } from "typeorm"
import { faker } from '@faker-js/faker';
import { IsString, IsUUID, IsBoolean } from 'class-validator';
import { SUPPLIER_TYPE, SubOrgType } from "../enum";



@Entity()
export class SubOrganization extends Base {
    @Column()
    @ApiProperty({
        example: faker.person.jobType(),
        description: '',
    })
    @IsString()
    name: string;

    @Column()
    @ApiProperty({
        example: faker.string.uuid(),
        description: '',
    })
    @IsUUID()
    uuid: string;

    @Column()
    @ApiProperty({
        example: faker.person.jobTitle(),
        description: '',
    })
    @IsString()
    description: string;

    @Column()
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    @IsString()
    code: string;

    @Column()
    @ApiProperty({
        example: faker.internet.url(),
        description: '',
    })
    @IsString()
    logoPhoto: string;

    @Column()
    @ApiProperty({
        example: faker.datatype.boolean(),
        description: '',
    })
    @IsBoolean()
    isActive: boolean;

    @Column()
    @ApiProperty({
        example: faker.date.recent(),
        description: '',
    })
    createdOn: Date;

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
    addressId: number;

    @Column()
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    orgId: number;

    @Column()
    @ApiProperty({
        
    })
    note: string;

    @Column()
    type: SubOrgType;

    @Column()
    fax: string;

    @Column()
    supplierType: SUPPLIER_TYPE;

    @Column()
    
    storeId: number;

    @Column()
    // @OneToOne(() => Address, (address) => address.subOrg)
    // @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
    //address: Address;
    address: string;

    @Column()
    // @OneToMany(() => Product, (product) => product.subOrg)
    // product: Product[];
    product: string;

    // @OneToMany(() => UserRole, (userRole) => userRole.subOrg)
    // userRole: UserRole[];
    @Column()
    userRole: string

    // @ManyToOne(() => Organization, (org) => org.subOrg)
    // @JoinColumn({ name: 'org_id', referencedColumnName: 'id' })
    // org: Organization;
    @Column()
    org: string

    // @OneToMany(
    //     () => StoreConnectSupplier,
    //     (storeConnectSupplier) => storeConnectSupplier.supplier
    // )
    // storeConnectSupplier: StoreConnectSupplier[];
    @Column()
    storeConnectSupplier: string


    // @OneToOne(() => Order, (order) => order.supplier)
    // orderSupplier: Order;
    @Column()
    orderSupplier: string

    // @OneToOne(() => Order, (order) => order.store)
    // orderStore: Order;
    // @OneToMany(() => DocumentSubOrganiztion, (contract) => contract.subOrg)
    // contract: DocumentSubOrganiztion[];
    @Column()
    contract: Array<string>;

    // @OneToMany(() => SubOrgCommision, (commission) => commission.subOrg)
    // commission: SubOrgCommision[];
    @Column()
    commission: Array<string>;

    // @ManyToOne(() => SubOrganization)
    // @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
    // store: SubOrganization;
    @Column()
    store: string

    // @OneToOne(
    //     () => InformationConnect,
    //     (informationConnect) => informationConnect.subOrg
    // )
    // informationConnect: InformationConnect;
    @Column()
    informationConnect: string

    // @OneToMany(() => InventoryProduct, inventoryProduct => inventoryProduct.branch)
    // inventoryProduct: InventoryProduct[]
    @Column()
    inventoryProduct: Array<string>;
}