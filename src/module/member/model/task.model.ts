import { Column, Entity, IsNull, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, Max, Min, IsUUID } from 'class-validator';

import { Code, TaskWork, User } from '@model';
import { Base, MaxGroup } from '@shared';
import { IEditor } from '@dto';

export enum Priority {
  Normal = -1,
  Hard = 0,
  Urgent = 1,
}

export enum Status {
  Cancel = -1,
  Processing = 0,
  Complete = 1,
}

@Entity()
export class Task extends Base {
  @Column({ nullable: true, name: 'project_code' })
  @Expose()
  @ApiProperty({ example: 'ARI', description: '' })
  @IsString()
  @IsOptional()
  readonly projectCode?: string;

  @ManyToOne(() => Code)
  @JoinColumn({ name: 'project_code', referencedColumnName: 'code' })
  readonly project?: Code;

  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  @IsOptional()
  code: string;

  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @IsString()
  name: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: {},
  })
  @Expose({ groups: [MaxGroup] })
  @ApiProperty({ example: [], description: '' })
  @IsOptional()
  content?: { blocks: IEditor[] };

  @Column()
  @ApiProperty({ example: faker.date.past(), description: '' })
  @IsDateString()
  start?: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.date.future(), description: '' })
  @IsDateString()
  finish?: Date;

  @Column()
  @ApiProperty({ example: faker.date.future(), description: '' })
  @IsDateString()
  deadline?: Date;

  @Column({ type: 'enum', enum: Priority, default: Priority.Hard })
  @ApiProperty({ example: faker.number.int({ min: -1, max: 1 }), description: '' })
  @IsInt()
  @Min(-1)
  @Max(1)
  priority: number;

  @Column({ type: 'enum', enum: Status, default: Status.Cancel })
  @ApiProperty({ example: faker.number.int({ min: -1, max: 1 }), description: '' })
  @IsInt()
  @Min(-1)
  @Max(1)
  status: number;

  @Column({ nullable: true, type: 'real' })
  @Expose()
  @ApiProperty({ example: faker.number.int({ min: 1, max: 12 }), description: '' })
  @IsNumber()
  @IsOptional()
  level?: number;

  @Column({ nullable: true, type: 'real' })
  @Expose()
  @ApiProperty({ example: faker.number.int({ min: 1, max: 100 }), description: '' })
  @IsNumber()
  @IsOptional()
  complete?: number;

  @Column()
  @ApiProperty({ example: 'T1,T2', description: '' })
  @IsString()
  successors: string;

  @Column()
  @ApiProperty({ example: 'T3,T4', description: '' })
  @IsString()
  predecessors: string;

  @Column({ nullable: true, type: 'real' })
  @Expose()
  @ApiProperty({ example: faker.number.int(), description: '' })
  @IsNumber()
  @IsOptional()
  hours?: number;

  @OneToMany(() => TaskWork, (data) => data.task)
  @Type(() => TaskWork)
  readonly works?: TaskWork[];

  @ManyToMany(() => User, (user) => user.tasks)
  @Type(() => User)
  assignees: User[];

  @Column({ nullable: true, name: 'manager_id' })
  @IsUUID()
  @Expose()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  managerId?: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'manager_id' })
  readonly manager?: User;
}