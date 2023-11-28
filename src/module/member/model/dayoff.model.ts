import { Entity, Column, JoinColumn, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsString, IsInt, IsDateString, Min, Max, IsDecimal, IsOptional, IsUUID } from 'class-validator';
import { Expose, Type } from 'class-transformer';

import { MaxGroup, Base } from '@shared';
import { TaskTimesheet, User } from '@model';

@Entity()
@Unique(['code'])
export class DayOff extends Base {
  @Column()
  @ApiProperty({ example: '230715000001', description: '' })
  @IsString()
  @IsOptional()
  code: string;

  @Column()
  @ApiProperty({ example: faker.number.int({ min: 1, max: 3 }), description: '' })
  @IsInt()
  @Min(1)
  @Max(3)
  type: number;

  @Column({ default: 0 })
  @ApiProperty({ example: faker.number.int({ min: -1, max: 1 }), description: '' })
  @IsInt()
  @Min(-1)
  @Max(1)
  status: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  reason: string;

  @Column()
  @ApiProperty({ example: faker.number.int({ min: 0, max: 2 }), description: '' })
  @IsInt()
  @Min(0)
  @Max(2)
  time: number;

  @Column({ nullable: true, type: 'real', name: 'time_number' })
  @ApiProperty({ example: faker.number.int({ min: 0.5, max: 1 }), description: '' })
  @IsDecimal()
  @Min(0.5)
  @Max(1)
  @IsOptional()
  timeNumber: number;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.image.url(), description: '' })
  @IsString()
  @IsOptional()
  image: string;

  @Column({ name: 'date_leave_start' })
  @ApiProperty({ example: faker.date.soon({ days: 1 }), description: '' })
  @IsDateString()
  dateLeaveStart: Date;

  @Column({ name: 'date_leave_end' })
  @ApiProperty({ example: faker.date.soon({ days: 10 }), description: '' })
  @IsDateString()
  dateLeaveEnd: Date;

  @Column({ nullable: true, name: 'approved_at' })
  @ApiProperty({ example: faker.date.soon({ days: 10 }), description: '' })
  @IsDateString()
  approvedAt: Date;

  @Column({ nullable: true, name: 'approved_by_id' })
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  approvedById: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'approved_by_id', referencedColumnName: 'id' })
  @Type(() => User)
  @Expose({ groups: [MaxGroup] })
  approvedBy: User;

  @Column({ nullable: true, name: 'reason_reject' })
  @IsString()
  @IsOptional()
  reasonReject: string;

  @Column({ name: 'staff_id' })
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  @IsOptional()
  staffId: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'staff_id', referencedColumnName: 'id' })
  @Type(() => User)
  @Expose({ groups: [MaxGroup] })
  staff: User;

  @Column({ nullable: true, name: 'manager_id' })
  @Expose({ groups: [MaxGroup] })
  @IsOptional()
  @IsUUID()
  managerId?: string;

  @ManyToOne(() => User, (user) => user.members, { eager: true })
  @Type(() => User)
  @JoinColumn({ name: 'manager_id' })
  @Expose({ groups: [MaxGroup] })
  readonly manager?: User;
}
