import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsOptional, IsString, IsUUID } from 'class-validator';

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

  @Column()
  @ApiProperty({ example: faker.lorem.paragraph(), description: '' })
  @IsString()
  @IsOptional()
  description: string;

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

  @Column()
  @Expose()
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ManyToOne(() => User, (user) => user.parameters)
  @JoinColumn()
  user?: User;
}
