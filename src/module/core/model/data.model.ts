import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsArray, IsInt, IsOptional, IsString, Min, IsUUID, IsDateString } from 'class-validator';
import { Expose } from 'class-transformer';

import { DataType, DataTranslation, User } from '@model';
import { MaxGroup, Base, setImage } from '@shared';

@Entity({ schema: 'core' })
export class Data extends Base {
  @Column()
  @ApiProperty({ example: faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] }), description: '' })
  @IsString()
  type: string;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.image.url(), description: '' })
  @IsString()
  @IsOptional()
  name?: string;

  @Column({ nullable: true })
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

  @Column({ nullable: true })
  @ApiProperty({ example: faker.number.int({ max: 10, min: 0 }), description: '' })
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.date.soon(), description: '' })
  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.date.past(), description: '' })
  @IsDateString()
  @IsOptional()
  endTime?: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: faker.image.url(), description: '' })
  @IsString()
  @IsOptional()
  icon?: string;

  @ManyToOne(() => DataType, (dataType) => dataType.items, { eager: false })
  @JoinColumn({ name: 'type', referencedColumnName: 'code' })
  @Expose({ groups: [MaxGroup] })
  public item?: DataType;

  @Column()
  @Expose()
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ManyToOne(() => User, (user) => user.datas)
  @JoinColumn()
  user?: User;

  @OneToMany(() => DataTranslation, (data) => data.data, { eager: true })
  @IsArray()
  public translations?: DataTranslation[];
}
