import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

import { Task, TaskTimesheet } from '@model';
import { Base } from '@shared';

@Entity({ schema: 'member' })
export class TaskWork extends Base {
  @Column({ nullable: true, type: 'real' })
  @Expose()
  @ApiProperty({ example: faker.number.int({ max: 12 * 60 * 60 }), description: '' })
  @IsNumber()
  @IsOptional()
  hours?: number;

  @Column()
  @IsUUID()
  @Expose()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  taskId?: string;

  @ManyToOne(() => Task, (data) => data.works, { eager: true })
  @JoinColumn()
  @Type(() => Task)
  readonly task?: Task;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Expose()
  @IsUUID()
  timesheetId?: string;

  @ManyToOne(() => TaskTimesheet, (data) => data.works, { eager: true })
  @JoinColumn()
  @Type(() => TaskTimesheet)
  readonly timesheet?: TaskTimesheet;
}
