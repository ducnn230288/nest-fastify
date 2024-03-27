import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '@model';

@Entity('room_utility')
export class RoomUtility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @Column()
  utilityId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => Room, (room) => room.utilities)
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room: Room;
}
