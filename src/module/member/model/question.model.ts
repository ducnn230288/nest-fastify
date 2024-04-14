import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Code } from '@model';
import { Base, setImage } from '@shared';

@Entity({ schema: 'member' })
export class Question extends Base {
  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: 'TEST_IQ', description: '' })
  @IsString()
  @IsOptional()
  readonly typeCode?: string;

  @ManyToOne(() => Code)
  @JoinColumn({ name: 'type_code', referencedColumnName: 'code' })
  readonly type?: Code;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  question: string;

  @Column()
  @Expose()
  @ApiProperty({ example: 'A,B,C,D', description: '' })
  @IsString()
  options: string;

  @Column()
  // @Exclude()
  @ApiProperty({ example: 'D', description: '' })
  @IsString()
  correct: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.image.url(), description: '' })
  @IsString()
  @IsOptional()
  image?: string;
  @BeforeInsert()
  @BeforeUpdate()
  beforeImage?(): void {
    this.image = setImage(this.image);
  }
  @AfterLoad()
  afterImage?(): void {
    this.image = setImage(this.image, false);
  }

  @Column({ nullable: true, type: 'real' })
  @Expose()
  @ApiProperty({ example: faker.number.int({ min: 1, max: 12 }), description: '' })
  @IsNumber()
  @IsOptional()
  level?: number;

  // @OneToMany(() => QuestionTest, (questionTest) => questionTest.questionId)
  // tests?: QuestionTest[];
}
