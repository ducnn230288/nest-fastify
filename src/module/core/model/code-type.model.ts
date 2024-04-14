import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsBoolean, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

import { Code } from '@model';
import { MaxGroup, Base } from '@shared';

/**
 * Represents a CodeType entity in the database.
 * Each CodeType has a unique code.
 */
@Entity({ schema: 'core' })
@Unique(['code'])
export class CodeType extends Base {
  /**
   * The name of the CodeType.
   */
  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @IsString()
  name: string;

  /**
   * The unique code of the CodeType.
   */
  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  @MaxLength(100)
  code: string;

  /**
   * Indicates if the CodeType is primary.
   */
  @Column({ default: false })
  @ApiProperty({ example: false, description: '' })
  @IsBoolean()
  isPrimary?: boolean;

  /**
   * A one-to-many relationship with the Code entity.
   */
  @OneToMany(() => Code, (category) => category.item, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Expose({ groups: [MaxGroup] })
  items?: Code[];
}
