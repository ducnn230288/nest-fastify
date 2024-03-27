import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BuildingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  ward: string;
}
