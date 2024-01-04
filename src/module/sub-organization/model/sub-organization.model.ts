import { ApiProperty } from '@nestjs/swagger';
import { Base, MaxGroup } from '@shared';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { faker } from '@faker-js/faker';
import { IsString, IsUUID, IsBoolean, IsOptional } from 'class-validator';
import { SUPPLIER_TYPE, SUBORG_TYPE } from '../enum';
import { Address } from '@model';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class SubOrganization extends Base {
  @Column()
  @ApiProperty({
    example: faker.person.jobType(),
    description: '',
  })
  @Expose()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: faker.string.uuid(),
    description: '',
  })
  @IsUUID()
  @Expose()
  uuid: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: faker.person.jobTitle(),
    description: '',
  })
  @IsString()
  @Expose()
  description: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: faker.finance.bic(),
    description: '',
  })
  @IsString()
  @Expose()
  code: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: faker.internet.url(),
    description: '',
  })
  @IsString()
  @Exclude()
  logoPhoto: string;

  @Column({ nullable: true, default: true })
  @ApiProperty({
    example: faker.datatype.boolean(),
    description: '',
  })
  @IsBoolean()
  @Exclude()
  isActive: boolean;

  // @Column()
  // @ApiProperty({
  //     example: faker.date.recent(),
  //     description: '',
  // })
  // createdOn: Date;

  @Column()
  @ApiProperty({
    example: faker.date.recent(),
    description: '',
  })
  @Exclude()
  updatedAt: Date;

  @Column({ name: 'address_id', nullable: true })
  @ApiProperty({ example: faker.finance.bic(), description: '' })
  @Exclude()
  addressId: string;

  @OneToOne(() => Address, (address) => address.subOrg, { eager: true })
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  @Exclude()
  address: Address;

  @Column({ nullable: true })
  @ApiProperty({
    example: faker.finance.bic(),
    description: '',
  })
  @Exclude()
  orgId: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: faker.person.jobTitle(),
    description: '',
  })
  @IsString()
  @IsOptional()
  @Expose()
  note: string;

  @Column()
  @ApiProperty({
    example: SUBORG_TYPE.STORE,
    description: '',
  })
  @Exclude()
  type: SUBORG_TYPE;

  @Column()
  @ApiProperty({
    example: faker.finance.iban(),
    description: '',
  })
  @IsString()
  @Expose()
  fax: string;

  @Column()
  @ApiProperty({
    example: SUPPLIER_TYPE.BALANCE,
    description: '',
  })
  @Expose()
  supplierType: SUPPLIER_TYPE;

  @Column({ nullable: true })
  @IsOptional()
  @ApiProperty({
    example: faker.string.uuid(),
    description: '',
  })
  @Exclude()
  storeId: string;

  @Column({ nullable: true })
  @Exclude()
  // @OneToMany(() => Product, (product) => product.subOrg)
  // product: Product[];
  product: string;

  // @OneToMany(() => UserRole, (userRole) => userRole.subOrg)
  // userRole: UserRole[];
  @Column({ nullable: true })
  @Exclude()
  userRole: string;

  // @ManyToOne(() => Organization, (org) => org.subOrg)
  // @JoinColumn({ name: 'org_id', referencedColumnName: 'id' })
  // org: Organization;
  @Column({ nullable: true })
  @Exclude()
  org: string;

  // @OneToMany(
  //     () => StoreConnectSupplier,
  //     (storeConnectSupplier) => storeConnectSupplier.supplier
  // )
  // storeConnectSupplier: StoreConnectSupplier[];
  @Column({ nullable: true })
  @Exclude()
  storeConnectSupplier: string;

  // @OneToOne(() => Order, (order) => order.supplier)
  // orderSupplier: Order;
  @Column({ nullable: true })
  @Exclude()
  orderSupplier: string;

  // @OneToOne(() => Order, (order) => order.store)
  // orderStore: Order;
  // @OneToMany(() => DocumentSubOrganiztion, (contract) => contract.subOrg)
  // contract: DocumentSubOrganiztion[];
  @Column({ nullable: true })
  @Exclude()
  contract: string;

  // @OneToMany(() => SubOrgCommision, (commission) => commission.subOrg)
  // commission: SubOrgCommision[];
  @Column({ nullable: true })
  @Exclude()
  commission: string;

  // @ManyToOne(() => SubOrganization)
  // @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  // store: SubOrganization;
  @Column({ nullable: true })
  @Exclude()
  store: string;

  // @OneToOne(
  //     () => InformationConnect,
  //     (informationConnect) => informationConnect.subOrg
  // )
  // informationConnect: InformationConnect;
  @Column({ nullable: true })
  @Exclude()
  informationConnect: string;

  // @OneToMany(() => InventoryProduct, inventoryProduct => inventoryProduct.branch)
  // inventoryProduct: InventoryProduct[]
  @Column({ nullable: true })
  @Exclude()
  inventoryProduct: string;
}
