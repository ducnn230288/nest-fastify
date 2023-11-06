import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDateString, IsString, IsUUID, IsOptional } from 'class-validator';

import { DayOff, TaskWork, User } from '@model';
import { Base } from '@shared';

@Entity()
export class TaskTimesheet extends Base {
  @Column()
  @ApiProperty({ example: faker.date.past(), description: '' })
  @IsDateString()
  start?: Date;

  @Column()
  @ApiProperty({ example: faker.date.future(), description: '' })
  @IsDateString()
  finish?: Date;

  @Column({ name: 'code_day_off' })
  @ApiProperty({ example: '230715000001', description: '' })
  @IsString()
  @IsOptional()
  codeDayOff?: string;

  @OneToOne(() => DayOff, (data) => data.taskTimesheet)
  @JoinColumn({ name: 'code_day_off', referencedColumnName: 'code' })
  @Type(() => DayOff)
  readonly dayOff: DayOff;

  @Column({ name: 'user_id' })
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Exclude()
  userId?: string;

  @ManyToOne(() => User, (user) => user.timesheet, { eager: true })
  @JoinColumn({ name: 'user_id' })
  @Type(() => User)
  readonly user: User;

  @OneToMany(() => TaskWork, (data) => data.taskId)
  @Type(() => TaskWork)
  readonly works?: TaskWork[];
}
