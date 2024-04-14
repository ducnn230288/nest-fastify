import { Column, Entity, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

import { Base } from '@shared';

@Entity({ schema: 'core' })
@Unique(['url'])
export class File extends Base {
  @Column()
  @ApiProperty({ example: 0, description: '' })
  @Exclude()
  type: number;

  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @IsString()
  url: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @Exclude()
  data?: string;

  @Column({ default: 0 })
  @ApiProperty({ example: 0, description: '' })
  @Exclude()
  status: number;

  @Column()
  @Exclude()
  userId?: string;

  // @ManyToOne(() => User, (data) => data.files, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // @Exclude()
  // @JoinColumn({ name: 'user_id' })
  // public user?: User;
}
