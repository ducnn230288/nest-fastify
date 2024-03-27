import { Room } from '@model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BuildingType } from './type.enum';
import { BuildingUtility } from './building-utility.entity';
import { AppUser } from './app-user.entity';
import { BuildingMedia } from './building-media.entity';
import { BuildingAddress } from './building-address.entity';
import { BuildingContent } from './building-content.entity';

@Entity('building')
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: BuildingType;

  @Column()
  address: string;

  @Column()
  description: string;

  @Column()
  media: string;

  @Column()
  isDeleted: boolean;

  @Column()
  createdBy: number;

  @Column()
  updatedBy: number;

  @Column()
  buildingAddressId: number;

  @ManyToOne(() => AppUser, (appUser) => appUser.id)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  landlord: AppUser;

  @OneToMany(() => BuildingMedia, (buildingMedia) => buildingMedia.building, {
    cascade: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'buildingId' })
  buildingMedia: BuildingMedia[];

  @OneToMany(() => BuildingUtility, (utility) => utility.building)
  utilities: BuildingUtility[];

  @OneToMany(() => Room, (room) => room.building)
  rooms: Room[];

  @OneToOne(() => BuildingAddress)
  @JoinColumn({ name: 'building_address_id', referencedColumnName: 'id' })
  buildingAddress: BuildingAddress;

  @OneToMany(() => BuildingContent, (buildingContent) => buildingContent.building, {
    cascade: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'buildingId' })
  buildingContent: BuildingContent[];
}
