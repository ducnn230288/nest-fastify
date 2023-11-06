import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDateString, IsString, IsUUID } from 'class-validator';

import { TaskWork, User } from '@model';
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
