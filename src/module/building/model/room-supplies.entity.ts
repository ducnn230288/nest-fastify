import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '@model';

@Entity('room_supplies')
export class RoomSupplies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  service: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  roomId: number;

  @Column()
  updatedAt: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedBy: number;

  @ManyToOne(() => Room, (room) => room.roomSupplies)
  room: Room;
}
