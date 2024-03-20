import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import {
  IsDateString,
  IsDecimal,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import * as argon2 from 'argon2';

import { UserRole, Code, Address, Data, Post, Parameter } from '@model';
import { Example, OnlyUpdateGroup, Base, setImage } from '@shared';

@Entity({ schema: 'user' })
export class User extends Base {
  @Column()
  @ApiProperty({ example: faker.person.fullName(), description: '' })
  @IsString()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.image.url(), description: '' })
  @IsString()
  @IsOptional()
  avatar?: string;
  @BeforeInsert()
  @BeforeUpdate()
  beforeAvatar?(): void {
    this.avatar = setImage(this.avatar);
  }
  @AfterLoad()
  afterAvatar?(): void {
    this.avatar = setImage(this.avatar, false);
  }

  @Column()
  @Expose({ groups: [OnlyUpdateGroup] })
  @ApiProperty({ example: Example.password, description: '' })
  @MinLength(6)
  @MaxLength(59)
  @IsOptional()
  password?: string;
  @BeforeInsert()
  @BeforeUpdate()
  async beforePassword?(): Promise<void> {
    if (this.password && this.password.length < 60) {
      this.password = this.password && (await argon2.hash(this.password));
    }
  }

  @Column({ nullable: true, type: 'varchar' }) // , name: 'refresh_token'
  @Exclude()
  refreshToken?: string | null;
  @BeforeUpdate()
  async beforeRefreshToken?(): Promise<void> {
    this.refreshToken = this.refreshToken && (await argon2.hash(this.refreshToken));
  }

  @Column({ nullable: true, type: 'varchar' })
  @IsString()
  otp?: string | null;

  @Column()
  @ApiProperty({ example: 'admin@admin.com', description: '' })
  @IsEmail()
  email?: string;

  @Column() // { name: 'phone_number' }
  @ApiProperty({ example: faker.phone.number(), description: '' })
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  phoneNumber: string;

  @Column()
  @ApiProperty({ example: faker.date.birthdate(), description: '' })
  @IsDateString()
  dob: Date;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  @ApiProperty({ example: [faker.lorem.paragraph()], description: '' })
  @IsOptional()
  description: string[];

  @Column({
    type: 'jsonb',
    array: false,
    default: [{}],
  })
  @Expose()
  @ApiProperty({ example: [{skill: "JS", complete: 95}], description: '' })
  @IsOptional()
  skill?: { name: string; complete: number }[];

  @Column({ nullable: true }) // , name: 'role_code'
  @Expose()
  @IsString()
  @IsOptional()
  roleCode?: string;

  @ManyToOne(() => UserRole, (role) => role.users, { eager: true }) //
  @JoinColumn({ name: 'roleCode', referencedColumnName: 'code' })
  @Type(() => UserRole)
  readonly role?: UserRole;

  @Column({ nullable: true }) // , name: 'position_code'
  @Expose()
  @ApiProperty({ example: 'DEV', description: '' })
  @IsString()
  @IsOptional()
  readonly positionCode?: string;

  @ManyToOne(() => Code)
  @JoinColumn({ name: 'positionCode', referencedColumnName: 'code' })
  readonly position?: Code;

  @Column() // { name: 'start_date' }
  @ApiProperty({ example: faker.date.past(), description: '' })
  @IsDateString()
  startDate?: Date;

  @Column({ nullable: true, type: 'real' }) // , name: 'date_leave'
  @ApiProperty({ example: faker.number.int({ min: 0.5, max: 12 }), description: '' })
  @IsNumber()
  @IsOptional()
  dateLeave?: number;

  @Column({ nullable: true, type: 'real', default: 0 }) // , name: 'date_off'
  @Expose()
  @ApiProperty({ example: faker.number.int({ min: 0.5, max: 12 }), description: '' })
  @IsDecimal()
  readonly dateOff: number;

  @OneToMany(() => Address, (address) => address.user)
  @Type(() => Address)
  readonly address?: Address[];

  @OneToMany(() => Data, (data) => data.user)
  @Type(() => Data)
  datas?: Data[];

  @OneToMany(() => Post, (post) => post.user)
  @Type(() => Post)
  posts?: Post[];

  @OneToMany(() => Parameter, (parameter) => parameter.user)
  @Type(() => Parameter)
  parameters?: Parameter[];
}
