import { faker } from '@faker-js/faker';
import { IsString, MaxLength, IsUUID } from 'class-validator';
import { Base } from '@shared';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity({ schema: 'member' })
export class Comment extends Base {
  @Column()
  @ApiProperty({ example: faker.lorem.paragraph(), default: '' })
  @IsString()
  content: string;

  @Column()
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Expose()
  readonly userId?: string;

  @Column()
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
