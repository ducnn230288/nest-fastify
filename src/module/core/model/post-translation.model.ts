import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

import { Post } from '@model';
import { MaxGroup, Base, setImageContent } from '@shared';

@Entity({ schema: 'core' })
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
  @MaxLength(100)
  slug: string;

  @Column({ nullable: true })
  @Expose({ groups: [MaxGroup] })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsOptional()
  content?: string;
  @BeforeInsert()
  @BeforeUpdate()
  beforeContent?(): void {
    this.content = setImageContent(this.content);
  }
  @AfterLoad()
  afterContent?(): void {
    this.content = setImageContent(this.content, false);
  }

  @Column()
  @Expose({ groups: [MaxGroup] })
  @IsUUID()
  @IsOptional()
  postId?: string;

  @ManyToOne(() => Post, (data) => data.translations, { eager: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  public post?: Post;
}
