import { Entity, Column, OneToMany, Unique, Tree, TreeChildren, TreeParent, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsBoolean, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

import { MaxGroup, Base } from '@shared';
import { Post } from '@model';

/**
 * Represents a PostType entity in the core schema.
 * Inherits from the Base class.
 */
@Entity({ schema: 'core' })
@Unique(['code'])
@Tree('materialized-path')
export class PostType extends Base {
  /**
   * The name of the PostType.
   * @type {string}
   */
  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @Expose()
  @IsString()
  name: string;

  /**
   * The code of the PostType.
   * @type {string}
   */
  @Column()
  @Expose()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  @MaxLength(100)
  code: string;

  /**
   * Indicates if the PostType is the primary one.
   * @type {boolean}
   */
  @Column({ default: false })
  @Expose()
  @ApiProperty({ example: false, description: '' })
  @IsBoolean()
  isPrimary?: boolean;

  /**
   * Array of Post entities associated with this PostType.
   * @type {Post[]}
   */
  @OneToMany(() => Post, (data) => data.item, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Expose({ groups: [MaxGroup] })
  items?: Post[];

  /**
   * Array of child PostType entities.
   * @type {PostType[]}
   */
  @TreeChildren()
  children?: PostType[];

  /**
   * Parent PostType entity of this PostType.
   * @type {PostType}
   */
  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent?: PostType;
}
