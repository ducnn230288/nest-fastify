import { Column, Entity, OneToMany, OneToOne, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsBoolean, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

import { Code } from '@model';
import { MaxGroup, Base } from '@shared';
import { Comment } from 'src/module/member/model/comment';

@Entity()
@Unique(['code'])
export class CodeType extends Base {
  @Column()
  @ApiProperty({ example: faker.person.jobType(), description: '' })
  @IsString()
  name: string;

  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  @MaxLength(100)
  code: string;

  @Column({ default: false, name: 'is_primary' })
  @ApiProperty({ example: false, description: '' })
  @IsBoolean()
  isPrimary?: boolean;

  @OneToMany(() => Code, (category) => category.item, { eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Expose({ groups: [MaxGroup] })
  items?: Code[];

  @OneToOne(() => Comment, (coment) => coment.itemComent)
  @Expose({ groups: [MaxGroup] })
  item?: Comment;
}
