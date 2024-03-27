import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '@model';

@Entity('room_cost')
export class RoomCost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unitPrice: number;

  @Column()
  unit: string;

  @Column()
  roomId: number;

  @Column()
  updatedAt: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedBy: number;

  @ManyToOne(() => Room, (room) => room.roomCost)
  room: Room;
}
