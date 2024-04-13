import { Building } from '@model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomContent } from './room-content.entity';
import { RoomCost } from './room-cost.entity';
import { RoomMedia } from './room-media.entity';
import { RoomSchedule } from './room-schedule.entity';
import { RoomSupplies } from './room-supplies.entity';

import { RoomUtility } from './room-utility.entity';
import { RoomType } from './type.enum';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomNumber: string;

  @Column()
  type: RoomType;

  @Column()
  numTenants: number;

  @Column()
  acreage: number;

  @Column()
  price: number;

  @Column()
  bonus: number;

  @Column()
  deposit: number;

  @Column()
  note: string;

  @Column()
  balcony: boolean;

  @Column()
  mezzanine: boolean;

  @Column()
  pet: boolean;

  @Column()
  updatedAt: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedBy: number;

  @Column()
  status: string;

  @Column()
  media: string;

  @Column()
  rentedBy: number;

  @Column({ default: false })
  isPublic: boolean;

  @Column()
  isDeleted: boolean;

  @Column()
  buildingId: number;

  @Column()
  bedroomTotal: number;

  @ManyToOne(() => Building, (building) => building.rooms)
  @JoinColumn({ name: 'building_id', referencedColumnName: 'id' })
  building: Building;

  @OneToMany(() => RoomContent, (roomContent) => roomContent.room)
  @JoinColumn({ name: 'id', referencedColumnName: 'roomId' })
  roomContent: RoomContent[];

  @OneToMany(() => RoomCost, (roomCost) => roomCost.room)
  @JoinColumn({ name: 'id', referencedColumnName: 'roomId' })
  roomCost: RoomCost[];

  @OneToMany(() => RoomSupplies, (roomSupplies) => roomSupplies.room, {
    cascade: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'roomId' })
  roomSupplies: RoomSupplies[];

  @OneToMany(() => RoomUtility, (roomUtility) => roomUtility.room)
  utilities: RoomUtility[];

  @OneToMany(() => RoomMedia, (roomMedia) => roomMedia.room, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'roomId' })
  roomMedia: RoomMedia[];

  @OneToMany(() => RoomSchedule, (roomSchedule) => roomSchedule.room)
  roomSchedule: RoomSchedule[];
}
