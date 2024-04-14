import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
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
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import * as argon2 from 'argon2';

import { UserRole, Code, Address, Booking, UserTeam, QuestionTest, Task } from '@model';
import { Example, MaxGroup, OnlyUpdateGroup, Base, setImage } from '@shared';
import { TaskTimesheet } from '../../member/model/task-timesheet.model';

@Entity({ schema: 'user' })
export class User extends Base {
  @Column()
  @ApiProperty({ example: faker.person.fullName(), description: '' })
  @IsString()
  name?: string;

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

  @Column({ nullable: true, type: 'varchar' })
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
  @ApiProperty({ example: faker.internet.email().toLowerCase(), description: '' })
  @IsEmail()
  email?: string;

  @Column()
  @ApiProperty({ example: faker.phone.number(), description: '' })
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  phoneNumber?: string;

  @Column()
  @ApiProperty({ example: faker.date.birthdate(), description: '' })
  @IsDateString()
  dob?: Date;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ nullable: true })
  @Expose()
  @IsString()
  @IsOptional()
  roleCode?: string;

  @ManyToOne(() => UserRole, (role) => role.users, { eager: true }) //
  @JoinColumn({ name: 'role_code', referencedColumnName: 'code' })
  @Type(() => UserRole)
  readonly role?: UserRole;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: 'DEV', description: '' })
  @IsString()
  @IsOptional()
  readonly positionCode?: string;

  @ManyToOne(() => Code)
  @JoinColumn({ name: 'position_code', referencedColumnName: 'code' })
  readonly position?: Code;

  @Column()
  @ApiProperty({ example: faker.date.past(), description: '' })
  @IsDateString()
  startDate?: Date;

  @Column({ nullable: true, type: 'real' })
  @ApiProperty({ example: faker.number.int({ min: 0.5, max: 12 }), description: '' })
  @IsNumber()
  @IsOptional()
  dateLeave?: number;

  @Column({ nullable: true, type: 'real', default: 0 })
  @Expose()
  @ApiProperty({ example: faker.number.int({ min: 0.5, max: 12 }), description: '' })
  @IsDecimal()
  dateOff?: number;

  @OneToMany(() => Address, (address) => address.user)
  @Type(() => Address)
  readonly address?: Address[];

  @OneToMany(() => Booking, (booking) => booking.user)
  @Type(() => Booking)
  readonly bookingRoom?: Booking[];

  @OneToMany(() => UserTeam, (team) => team.manager)
  @Type(() => UserTeam)
  readonly managers?: UserTeam[];

  @ManyToMany(() => UserTeam, (team) => team.users, { eager: true })
  @Type(() => UserTeam)
  @IsOptional()
  @JoinTable()
  teams?: UserTeam[];

  @Column({ nullable: true })
  @Expose({ groups: [MaxGroup] })
  @IsOptional()
  @IsUUID()
  managerId?: string;

  @ManyToOne(() => User, (user) => user.members, { eager: true })
  @Type(() => User)
  @JoinColumn()
  readonly manager?: User;

  @OneToMany(() => User, (user) => user.manager)
  @Type(() => User)
  readonly members?: User[];

  @OneToMany(() => QuestionTest, (data) => data.userId)
  @Type(() => QuestionTest)
  readonly tests?: QuestionTest[];

  @OneToMany(() => TaskTimesheet, (data) => data.userId)
  @Type(() => TaskTimesheet)
  readonly timesheet?: TaskTimesheet[];

  @OneToMany(() => Task, (data) => data.manager)
  @Type(() => Task)
  readonly task?: Task[];

  @ManyToMany(() => Task, (team) => team.assignees, { eager: true })
  @Type(() => Task)
  @IsOptional()
  @JoinTable()
  tasksAssignees?: Task[];
}
