import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  Base,
  //  Example, OnlyUpdateGroup
} from '@shared';
// import * as argon2 from 'argon2';
// import { Expose } from 'class-transformer';
import {
  IsString,
  IsEmail,
  // IsBoolean,
  // IsDateString,
  // IsNumber,
  // IsOptional,
  // IsUUID,
  // MaxLength,
  // MinLength,
} from 'class-validator';
import {
  Column,
  Entity,
  // BeforeInsert, BeforeUpdate, JoinColumn
} from 'typeorm';

@Entity()
export class UserAdmin extends Base {
  @Column()
  @ApiProperty({ example: faker.person.fullName(), description: '' })
  @IsString()
  username: string;

  // @Column({ nullable: true })
  // @ApiProperty({
  //   example: faker.string.uuid(),
  //   description: '',
  // })
  // @IsUUID()
  // uuid: string;

  // @Column({ nullable: true })
  // @Expose({ groups: [OnlyUpdateGroup] })
  // @ApiProperty({ example: Example.password, description: '' })
  // @MinLength(6)
  // @MaxLength(59)
  // @IsOptional()
  // password?: string;
  // @BeforeInsert()
  // @BeforeUpdate()
  // async beforePassword?(): Promise<void> {
  //   if (this.password && this.password.length < 60) {
  //     this.password = this.password && (await argon2.hash(this.password));
  //   }
  // }

  // @Column()
  // @ApiProperty({ example: faker.person.firstName(), description: '' })
  // @IsString()
  // name: string;

  // @Column()
  // @ApiProperty({ example: faker.date.birthdate(), description: '' })
  // @IsDateString()
  // dateOfBirth: Date;

  @Column()
  @ApiProperty({ example: faker.internet.email(), description: '' })
  @IsEmail()
  email: string;

  // @Column()
  // @ApiProperty({ example: faker.string.numeric(9), description: '' })
  // @IsNumber()
  // identityCard: string;

  @Column()
  @ApiProperty({ example: faker.finance.accountNumber(12), description: '' })
  @IsString()
  phoneNumber: string;

  // @Column()
  // @ApiProperty({ example: faker.person.gender(), description: '' })
  // @IsDateString()
  // gender: string;

  // @Column()
  // @ApiProperty({ example: faker.image.url(), description: '' })
  // @IsString()
  // profileImage: string;

  // @Column()
  // @ApiProperty({ example: faker.datatype.boolean(), description: '' })
  // @IsBoolean()
  // isActive: boolean;

  // @Column()
  // @ApiProperty({ example: faker.datatype.boolean(), description: '' })
  // isDeactivated: boolean;

  // @Column()
  // @ApiProperty({ example: faker.date.recent(), description: '' })
  // createdOn: Date;

  // @Column()
  // @ApiProperty({ example: faker.date.recent(), description: '' })
  // updatedAt: Date;

  // @Column()
  // @ApiProperty({ example: faker.date.past(), description: '' })
  // lastLogin: Date;

  // @Column()
  // @ApiProperty({ example: faker.finance.bic(), description: '' })
  // addressId: number;

  // @Column()
  // @ApiProperty({ example: faker.finance.bic(), description: '' })
  // orgId: number;

  // @Column()
  // @ApiProperty({ example: faker.finance.bic(), description: '' })
  // subOrgId: number;

  @Column()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  note: string;

  // @Column()
  // @ApiProperty({ example: faker.finance.bic(), description: '' })
  // @IsString()
  // code: string;

  // @Column()
  // @ApiProperty({ example: faker.finance.bic(), description: '' })
  // @IsString()
  // sale_code: string;

  // @Column()
  // @ApiProperty({ example: faker.datatype.boolean() ? 'active' : 'inactive', description: '' })
  // @IsString()
  // status: string;

  // @Column()
  // @ApiProperty({ example: faker.finance.bic(), description: '' })
  // parentId: number;

  // //   @OneToOne(() => UserAdmin, (userAdmin) => userAdmin.parent)
  // @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  // //   parent: UserAdmin;
  // parent: string;

  // //   @OneToOne(() => UserProfile, { eager: true })
  // @JoinColumn({ name: 'id', referencedColumnName: 'user_admin_id' })
  // //   profile: UserProfile;
  // profile: string;

  // //   @OneToOne(() => Organization)
  // @JoinColumn({ name: 'org_id', referencedColumnName: 'id' })
  // //   org: Organization;
  // org: string;

  // //   @OneToOne(() => SubOrganization)
  // @JoinColumn({ name: 'sub_org_id', referencedColumnName: 'id' })
  // //   subOrg: SubOrganization;
  // subOrg: string;

  // //   @OneToOne(() => Address)
  // @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  // //   address: Address;
  // address: string;

  // //   @OneToMany(() => UserRole, (userRole) => userRole.userAdmin)
  // //   userRole: UserRole[];
  // userRole: string;

  // //   @OneToOne(() => Cart, (cart) => cart.userAdmin)
  // //   cart: Cart;
  // cart: string;
}
