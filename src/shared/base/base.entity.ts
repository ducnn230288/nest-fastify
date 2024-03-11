import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  id?: string;

  @DeleteDateColumn() // { name: 'is_deleted' }
  @Exclude()
  isDeleted?: Date;

  @Column({ nullable: true, type: 'timestamp' }) // , name: 'is_disabled'
  @IsDateString()
  @IsOptional()
  isDisabled?: Date | null;

  @CreateDateColumn() // { name: 'created_at' }
  @IsDateString()
  @IsOptional()
  createdAt?: Date;

  @UpdateDateColumn() // { name: 'updated_at' }
  readonly updatedAt?: Date;
}
