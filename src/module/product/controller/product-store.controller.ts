import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import dayjs from 'dayjs';

import {
  ProductCreateStoreRequestDto,
  ListProductStoreResponseDto,
  ProductStoreResponseDto,
  ProductUpdateStoreRequestDto,
} from '@dto';
import { User } from '@model';
import { ProductStoreService, STORE_CREATE, STORE_UPDATE, STORE_DELETE } from '@service';
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, Public, SerializerBody } from '@shared';

@Headers('product-store')
export class ProductStoreController {
  constructor(private readonly storeService: ProductStoreService) {}

  @Auth({
    summary: 'Create a STORE_PRODUCT',
    permission: STORE_CREATE,
  })
  @Post('')
  async create(
    @AuthUser() user: User,
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: ProductCreateStoreRequestDto,
  ): Promise<ProductStoreResponseDto> {
    const data = Object.assign(body, { userId: user.id });
    return {
      message: i18n.t('common.Create Success'),
      data: await this.storeService.create(data),
    };
  }

  @Public({
    summary: 'Get List Data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('')
  async getAll(
    @I18n() i18n: I18nContext,
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<ListProductStoreResponseDto> {
    const [result, total] = await this.storeService.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  @Public({
    summary: 'Get Detail Data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<ProductStoreResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.storeService.findOne(id, ['products']),
    };
  }

  @Auth({
    summary: 'Update a STORE_PRODUCT',
    permission: STORE_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody([MaxGroup])) updateData: ProductUpdateStoreRequestDto,
  ): Promise<ProductStoreResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.storeService.update(id, updateData),
    };
  }

  @Auth({
    summary: 'Delete a STORE_PRODUCT',
    permission: STORE_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<ProductStoreResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.storeService.remove(id),
    };
  }

  @Auth({
    summary: 'Delete a STORE_PRODUCT',
    permission: STORE_UPDATE,
  })
  @Put(':id/disable/:boolean')
  async updateDisable(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('boolean') boolean: string,
  ): Promise<ProductStoreResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.storeService.update(id, { isDisabled: boolean === 'true' ? dayjs().toDate() : null }),
    };
  }
}
