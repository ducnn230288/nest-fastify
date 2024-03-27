import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,} from 'typeorm';
import { Building } from '@model';

@Entity()
export class BuildingContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buildingId: number;

  @Column()
  content: string;

  @Column()
  slug: string;

  @ManyToOne(() => Building, (building) => building.buildingContent)
  @JoinColumn({ name: 'building_id', referencedColumnName: 'id' })
  building: Building;
}
