import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Building } from '@model';

@Entity('building_utility')
export class BuildingUtility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buildingId: number;

  @Column()
  utilityId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => Building, (building) => building.utilities)
  @JoinColumn({ name: 'building_id', referencedColumnName: 'id' })
  building: Building;
}
