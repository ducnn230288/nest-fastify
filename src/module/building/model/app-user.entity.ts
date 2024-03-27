import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';


@Entity()
export class AppUser {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  identityCard: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  profileImage: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: Date;


}
