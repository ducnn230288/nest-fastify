import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

import { Base } from '@shared';
import { User, Code, CodeType } from '@model';

@Entity()
export class Booking extends Base {
  @Column()
  @ApiProperty({ example: faker.lorem.text(), description: '' })
  @IsString()
  name: string;

  @Column()
  @ApiProperty({ example: faker.lorem.text(), description: '' })
  @IsString()
  description: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.date.soon(), description: '' })
  @IsString()
  @IsOptional()
  startTime: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.date.soon(), description: '' })
  @IsString()
  @IsOptional()
  endTime: Date;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsString()
  userId: string;

  @ManyToOne(() => User, (user) => user.bookingRoom, { eager: true })
  @Type(() => User)
  readonly user: User;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: 'room', description: '' })
  @IsString()
  @IsOptional()
  readonly typeCode?: string;

  @ManyToOne(() => CodeType)
  @JoinColumn({ name: 'type', referencedColumnName: 'code' })
  readonly type?: CodeType;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: 'ROOM', description: '' })
  @IsString()
  @IsOptional()
  readonly itemCode?: string;

  @ManyToOne(() => Code)
  @JoinColumn({ name: 'itemCode', referencedColumnName: 'code' })
  readonly item?: Code;
}
