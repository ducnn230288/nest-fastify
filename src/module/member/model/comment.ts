import { faker } from '@faker-js/faker';
import { IsString, MaxLength } from 'class-validator';
import { Base } from '@shared';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CodeType } from '@model';

@Entity()
export class Comment extends Base {
  @Column()
  @ApiProperty({ example: faker.lorem.paragraph(), default: '' })
  @IsString()
  content: string;

  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  @MaxLength(100)
  type: string;

  @OneToOne(() => CodeType, (codeType) => codeType.item, { eager: false })
  @JoinColumn({ name: 'type', referencedColumnName: 'code' })
  public itemComent?: CodeType;
}
