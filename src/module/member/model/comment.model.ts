import { faker } from '@faker-js/faker';
import { IsString, MaxLength, IsUUID, IsOptional } from 'class-validator';
import { Base } from '@shared';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Code, CodeType, User } from '@model';
import { Exclude, Expose, Type } from 'class-transformer';

@Entity()
export class Comment extends Base {
  @Column()
  @ApiProperty({ example: faker.lorem.paragraph(), default: '' })
  @IsString()
  content: string;

  @Column({ name: 'user_id' })
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Expose()
  readonly userId?: string;

  @Column({ name: 'table_id' })
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Expose()
  readonly tableId?: string;

  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  @MaxLength(100)
  type: string;
}
