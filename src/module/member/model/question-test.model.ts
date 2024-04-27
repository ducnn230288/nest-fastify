import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { User } from '@model';
import { Base } from '@shared';

@Entity({ schema: 'member' })
export class QuestionTest extends Base {
  @Column({ nullable: true, type: 'real' })
  @Expose()
  @ApiProperty({ example: faker.number.int({ min: 1, max: 20 }), description: '' })
  @IsNumber()
  @IsOptional()
  point?: number;

  @Column({
    type: 'jsonb',
    array: false,
    default: {},
  })
  // @Expose({ groups: [MaxGroup] })
  @ApiProperty({ example: {}, description: '' })
  @IsOptional()
  answer?: object;

  @Column()
  @IsString()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Exclude()
  userId?: string;

  @ManyToOne(() => User, (user) => user.tests, { eager: true })
  @JoinColumn()
  @Type(() => User)
  readonly user: User;

  // @Column({ name: 'question_id' })
  // @IsString()
  // @ApiProperty({ example: faker.string.uuid(), description: '' })
  // @Exclude()
  // questionId?: string;

  // @ManyToOne(() => Question, (question) => question.tests, { eager: true })
  // @JoinColumn({ name: 'question_id' })
  // @Type(() => Question)
  // readonly question?: Question;
}
