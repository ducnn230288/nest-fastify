import { ApiProperty } from "@nestjs/swagger";
import { Base } from "@shared"
import { Column, Entity, JoinColumn, OneToOne } from "typeorm"
import { faker } from '@faker-js/faker';
import { IsString, IsUUID, IsBoolean, IsOptional } from 'class-validator';
import { SUPPLIER_TYPE, SubOrgType } from "../enum";
import { Address } from "@model";



@Entity()
export class SubOrganization extends Base {
    @Column()
    @ApiProperty({
        example: faker.person.jobType(),
        description: '',
    })
    @IsString()
    name: string;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.string.uuid(),
        description: '',
    })
    @IsUUID()
    uuid: string;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.person.jobTitle(),
        description: '',
    })
    @IsString()
    description: string;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    @IsString()
    code: string;

    @Column({nullable:true})
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

    @Column({name: 'address_id',nullable:true})
    @ApiProperty({ example: faker.finance.bic(), description: ''  })
    addressId: string;

    @OneToOne(() => Address, (address) => address.subOrg, { eager: true })
    @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
    address: Address;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.finance.bic(),
        description: '',
    })
    orgId: number;

    @Column({nullable:true})
    @ApiProperty({
        example: faker.person.jobTitle(),
        description: '',
    })
    @IsString()
    @IsOptional()
    note: string;

    @Column()
    type: SubOrgType;

    @Column()
    @ApiProperty({
        example: faker.finance.iban(),
        description: '',
    })
    @IsString()
    fax: string;

    @Column()
    supplierType: SUPPLIER_TYPE;

    @Column({nullable:true})
    @IsOptional()
    @ApiProperty({
        example: faker.string.uuid(),
        description: '',
    })
    storeId: number;

    @Column({nullable:true})
    // @OneToMany(() => Product, (product) => product.subOrg)
    // product: Product[];
    product: string;

    // @OneToMany(() => UserRole, (userRole) => userRole.subOrg)
    // userRole: UserRole[];
    @Column({nullable:true})
    userRole: string

    // @ManyToOne(() => Organization, (org) => org.subOrg)
    // @JoinColumn({ name: 'org_id', referencedColumnName: 'id' })
    // org: Organization;
    @Column({nullable:true})
    org: string

    // @OneToMany(
    //     () => StoreConnectSupplier,
    //     (storeConnectSupplier) => storeConnectSupplier.supplier
    // )
    // storeConnectSupplier: StoreConnectSupplier[];
    @Column({nullable:true})
    storeConnectSupplier: string


    // @OneToOne(() => Order, (order) => order.supplier)
    // orderSupplier: Order;
    @Column({nullable:true})
    orderSupplier: string

    // @OneToOne(() => Order, (order) => order.store)
    // orderStore: Order;
    // @OneToMany(() => DocumentSubOrganiztion, (contract) => contract.subOrg)
    // contract: DocumentSubOrganiztion[];
    @Column({nullable:true})
    contract: string

    // @OneToMany(() => SubOrgCommision, (commission) => commission.subOrg)
    // commission: SubOrgCommision[];
    @Column({nullable:true})
    commission: string

    // @ManyToOne(() => SubOrganization)
    // @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
    // store: SubOrganization;
    @Column({nullable:true})
    store: string

    // @OneToOne(
    //     () => InformationConnect,
    //     (informationConnect) => informationConnect.subOrg
    // )
    // informationConnect: InformationConnect;
    @Column({nullable:true})
    informationConnect: string

    // @OneToMany(() => InventoryProduct, inventoryProduct => inventoryProduct.branch)
    // inventoryProduct: InventoryProduct[]
    @Column({nullable:true})
    inventoryProduct: string
}