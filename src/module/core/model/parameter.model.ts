import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';

import { Base } from '@shared';
import { Expose } from 'class-transformer';
import { User } from '@model';

@Entity({ schema: 'core' })
export class Parameter extends Base {
  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  @IsOptional()
  code: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString({ each: true })
  @IsOptional()
  description: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.number.int({ min: 0, max: 10 }), description: '' })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  vn?: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  en?: string;

  @Column({ nullable: true })
  @Expose()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @IsUUID()
  userId?: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  public user?: User;
}
