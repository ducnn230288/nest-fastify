import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

import { Post } from '@model';
import { MaxGroup, Base, setImageContent } from '@shared';

@Entity()
export class PostTranslation extends Base {
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
  @ApiProperty({ example: faker.lorem.slug(), description: '' })
  @IsString()
  @IsOptional()
  slug: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: {},
  })
  @Expose({ groups: [MaxGroup] })
  @ApiProperty({ example: [], description: '' })
  @IsOptional()
  content?: Record<string, any>;
  @BeforeInsert()
  @BeforeUpdate()
  beforeContent?: () => void = () => (this.content = setImageContent(this.content));
  @AfterLoad()
  afterContent?: () => void = () => (this.content = setImageContent(this.content, false));

  @Column()
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  @IsOptional()
  postId?: string;

  @ManyToOne(() => Post, (data) => data.translations, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  public post?: Post;
}
