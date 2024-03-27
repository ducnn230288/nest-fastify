import { Column,ManyToOne, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '@model';

@Entity()
export class RoomContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @Column()
  content: string;

  @Column()
  slug: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  createdBy: number;

  @Column()
  updatedBy: number;

  @Column()
  isDeleted: boolean;

  @ManyToOne(() => Room, (room) => room.roomContent)
  room: Room;
}
