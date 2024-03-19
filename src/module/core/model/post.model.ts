import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

import { PostType, PostTranslation, User } from '@model';
import { MaxGroup, Base, setImage } from '@shared';

@Entity({ schema: 'core' })
export class Post extends Base {
  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  type: string;

  @Column({ nullable: true }) // , name: 'thumbnail_url'
  @ApiProperty({ example: faker.image.url(), description: '' })
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;
  @BeforeInsert()
  @BeforeUpdate()
  beforeThumbnailUrl?(): void {
    this.thumbnailUrl = setImage(this.thumbnailUrl);
  }
  @AfterLoad()
  afterThumbnailUrl?(): void {
    this.thumbnailUrl = setImage(this.thumbnailUrl, false);
  }

  @ManyToOne(() => PostType, (dataType) => dataType.items, { eager: false })
  @JoinColumn({ name: 'type', referencedColumnName: 'code' })
  @Expose({ groups: [MaxGroup] })
  public item?: PostType;

  @Column()
  @Expose()
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user?: User;

  @OneToMany(() => PostTranslation, (data) => data.post, { eager: true })
  @IsArray()
  public translations?: PostTranslation[];
}
