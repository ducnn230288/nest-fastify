import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

import { appConfig } from '@config';
import { Data } from '@model';
import { MaxGroup, Base } from '@shared';

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
  readonly content?: Record<string, any>;
  @BeforeInsert()
  @BeforeUpdate()
  beforeContent?(): void {
    if (this.content?.blocks) {
      this.content.blocks = this.content?.blocks.map((item) => {
        if (item.type === 'image') item.data.file.url = item.data.file.url.replace(appConfig.URL_FILE, '');
        return item;
      });
    }
  }
  @AfterLoad()
  afterContent?(): void {
    if (this.content?.blocks) {
      this.content.blocks = this.content?.blocks.map((item) => {
        if (item.type === 'image') item.data.file.url = appConfig.URL_FILE + item.data.file.url;
        return item;
      });
    }
  }

  @Column()
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  @IsOptional()
  dataId?: string;

  @ManyToOne(() => Data, (data) => data.translations, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  public data?: Data;
}
