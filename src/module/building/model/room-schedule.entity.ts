import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '@model';

@Entity()
export class RoomSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  customerPhoneNumber: string;

  @Column()
  appointmentTime: Date;

  @Column()
  updatedAt: Date;

  @Column()
  updatedBy: number;

  @Column()
  roomId: number;

  @ManyToOne(() => Room, (room) => room.roomSchedule)
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room: Room;
}
