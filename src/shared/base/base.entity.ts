import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';
import { MaxGroup } from '@shared';

@Entity()
export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  @ApiProperty({ example: faker.string.uuid(), description: '' })
  @Expose({ groups: [MaxGroup] })
  id?: string;

  @DeleteDateColumn({ name: 'is_deleted' })
  @Exclude()
  isDeleted?: Date;

  @Column({ nullable: true, type: 'timestamp', name: 'is_disabled' })
  @IsDateString()
  @IsOptional()
  @Exclude()
  isDisabled?: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  @IsDateString()
  @IsOptional()
  @Exclude()
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt?: Date;
}
