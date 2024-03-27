import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Building } from '@model';

@Entity()
export class BuildingMedia {
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
  buildingId: number;

  @Column()
  isDefault: boolean;

  @Column()
  size: number;

  @Column()
  mediaType: string;

  @ManyToOne(() => Building, (building) => building.buildingMedia)
  @JoinColumn({ name: 'building_id', referencedColumnName: 'id' })
  building: Building;
}
