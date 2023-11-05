import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Task, TaskTimesheet } from '@model';
import { Base } from '@shared';

@Entity()
export class TaskWork extends Base {
  @Column({ nullable: true, type: 'real' })
  @Expose()
  @ApiProperty({ example: faker.number.int(), description: '' })
  @IsNumber()
  @IsOptional()
  hours?: number;

  @Column({ name: 'task_id' })
  @IsString()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Exclude()
  taskId?: string;

  @ManyToOne(() => Task, (data) => data.works, { eager: true })
  @JoinColumn({ name: 'task_id' })
  @Type(() => Task)
  readonly task?: Task;

  @Column({ name: 'timesheet_id' })
  @IsString()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Exclude()
  timesheetId?: string;

  @ManyToOne(() => TaskTimesheet, (data) => data.works, { eager: true })
  @JoinColumn({ name: 'timesheet_id' })
  @Type(() => TaskTimesheet)
  readonly timesheet?: TaskTimesheet;
}
