import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '@model';

@Entity('room_media')
export class RoomMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  updatedBy: number;

  @Column()
  roomId: number;

  @Column()
  isDefault: boolean;

  @Column()
  size: number;

  @Column()
  mediaType: string;

  @ManyToOne(() => Room, (room) => room.roomMedia)
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room: Room;

}
