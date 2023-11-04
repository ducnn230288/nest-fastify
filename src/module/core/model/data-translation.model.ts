import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

import { Data } from '@model';
import { MaxGroup, Base, setImageContent } from '@shared';
import { IEditor } from '@dto';

@Entity()
export class DataTranslation extends Base {
  @Column()
  @ApiProperty({ example: 'en', description: '' })
  @IsString()
  language: string;

  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @IsString()
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  position?: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: {},
  })
  @Expose({ groups: [MaxGroup] })
  @ApiProperty({ example: [], description: '' })
  @IsOptional()
  content?: { blocks: IEditor[] };
  @BeforeInsert()
  @BeforeUpdate()
  beforeContent?(): void {
    this.content = setImageContent(this.content);
  }
  @AfterLoad()
  afterContent?(): void {
    this.content = setImageContent(this.content, false);
  }

  @Column({ name: 'data_id' })
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  @IsOptional()
  dataId?: string;

  @ManyToOne(() => Data, (data) => data.translations, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'data_id' })
  public data?: Data;
}
