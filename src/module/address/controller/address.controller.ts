import { BadRequestException, Body, Get, Param, Post, Put, Query, ValidationPipe, Delete } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';

import { ListAddressResponseDto, AddressResponseDto, CreateAddressRequestDto, UpdateAddressRequestDto } from '@dto';
import { AddressService, P_ADDRESS_LISTED, P_ADDRESS_CREATE, P_ADDRESS_UPDATE, P_ADDRESS_DELETE, P_ADDRESS_DETAIL } from '@service';
import { User } from '@model';

@Headers('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}
  
  @Auth({
      summary: 'Get List Address',
      permission: P_ADDRESS_LISTED,
  })
  @Get()
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListAddressResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail Address',
    permission: P_ADDRESS_DETAIL,
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
    permission: P_ADDRESS_CREATE,
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
    permission: P_ADDRESS_UPDATE,
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
    summary: 'Delete address',
    permission: P_ADDRESS_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<AddressResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.removeHard(id),
    };
  }
}
