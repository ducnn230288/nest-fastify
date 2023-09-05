import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { Base } from '@shared';
import { Room, User } from '@model';

@Entity()
export class BookingRoom extends Base {
  @Column()
  @ApiProperty({ example: faker.date.soon(), description: '' })
  @IsString()
  bookDate: Date;

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
  @ApiProperty({ example: faker.lorem.text(), description: '' })
  @IsString()
  description: string;

  @Column()
  @ApiProperty({ example: faker.lorem.text(), description: '' })
  @IsString()
  meetingName: string;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsString()
  userId: string;

  @Column()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsString()
  roomId: string;

  @ManyToOne(() => User, (user) => user.bookingRoom, { eager: true })
  @Type(() => User)
  readonly user: User;

  @ManyToOne(() => Room, (room) => room.bookingRoom, { eager: true })
  @Type(() => Room)
  readonly room: Room;
}
