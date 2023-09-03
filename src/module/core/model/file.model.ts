import { Column, Entity, ManyToOne, AfterLoad } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

import { User } from '@model';
import { Base } from '@shared';
import { appConfig } from '@config';

@Entity()
export class File extends Base {
  @Column()
  @ApiProperty({ example: 0, description: '' })
  @Exclude()
  type: number;

  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @IsString()
  url: string;
  @AfterLoad()
  changeUrl(): void {
    if (this.type === 0) this.url = appConfig.DOMAIN + '/api/file/' + this.url;
  }

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @Exclude()
  data?: string;

  @Column()
  @Exclude()
  userId?: string;

  @ManyToOne(() => User, (data) => data.files, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Exclude()
  public user?: User;
}
