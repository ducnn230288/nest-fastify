import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { appConfig } from '@config';
import { PostType, PostTranslation } from '@model';
import { MaxGroup, Base } from '@shared';

@Entity()
export class Post extends Base {
  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  type: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.image.url(), description: '' })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;
  @BeforeInsert()
  @BeforeUpdate()
  beforeThumbnailUrl?(): void {
    if (this.thumbnailUrl && this.thumbnailUrl.indexOf(appConfig.URL_FILE) === 0)
      this.thumbnailUrl = this.thumbnailUrl.replace(appConfig.URL_FILE, '');
  }
  @AfterLoad()
  afterThumbnailUrl?(): void {
    if (this.thumbnailUrl && this.thumbnailUrl.indexOf('http') === -1)
      this.thumbnailUrl = appConfig.URL_FILE + this.thumbnailUrl;
  }

  @ManyToOne(() => PostType, (dataType) => dataType.items, { eager: false })
  @JoinColumn({ name: 'type', referencedColumnName: 'code' })
  @Expose({ groups: [MaxGroup] })
  public item?: PostType;

  @OneToMany(() => PostTranslation, (data) => data.post, { eager: true })
  @IsArray()
  public translations?: PostTranslation[];
}
