import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';
import { Expose, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { Base } from '@shared';
import { Task } from './task.model';

@Entity({ schema: 'member' })
export class TaskSub extends Base {
  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @IsString()
  name: string;

  @Column({ default: null, nullable: true })
  @ApiProperty({ example: faker.date.soon(), description: '' })
  @IsDateString()
  completed: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.image.url(), description: '' })
  @IsString()
  @IsOptional()
  image: string;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Expose()
  @IsUUID()
  taskId: string;

  @ManyToOne(() => Task, (task) => task.taskSubs, { eager: true })
  @JoinColumn()
  @Type(() => Task)
  task: Task;
}
