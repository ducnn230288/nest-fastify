import { Body, Get, Param, Post, Put, Query, ValidationPipe, Delete } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';

import { ListAddressResponseDto, AddressResponseDto, CreateAddressRequestDto, UpdateAddressRequestDto } from '@dto';
import { AddressService } from '@service';
import { User } from '@model';

@Headers('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Auth({
    summary: 'Get List Address',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get()
  async findAll(
    @I18n() i18n: I18nContext,
    @AuthUser() user: User,
    @Query(new ValidationPipe({ transform: true }))
    paginationQuery: PaginationQueryDto,
  ): Promise<ListAddressResponseDto> {
    if (user.roleCode !== 'supper_admin') paginationQuery.where = [{ userId: user.id }];
    const [result, total] = await this.service.findAll(paginationQuery);

    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail Address',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<AddressResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Create Address',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post()
  async create(
    @AuthUser() user: User,
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateAddressRequestDto,
  ): Promise<AddressResponseDto> {
    const data = Object.assign(body, { userId: user.id });
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(data),
    };
  }

  @Auth({
    summary: 'Update Address',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdateAddressRequestDto,
  ): Promise<AddressResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Delete Address',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<AddressResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}
