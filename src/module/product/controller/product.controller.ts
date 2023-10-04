import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, Public, SerializerBody } from '@shared';
import { ProductService, PRODUCT_TYPE_CREATE, PRODUCT_TYPE_DETAIL, StoreService, PRODUCT_TYPE_UPDATE } from '@service';
import { CreateProductTypeRequestDto, ListProductResponseDto, ProductResponseDto, UpdateProductRequestDto } from '@dto';
import { User } from '@model';
import dayjs from 'dayjs';

@Headers('product')
export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly stroreService: StoreService,
  ) {}

  @Public({
    summary: 'Get List data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListProductResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail data',
    permission: PRODUCT_TYPE_DETAIL,
  })
  @Get('slug/:slug')
  async findBySlug(@I18n() i18n: I18nContext, @Param('slug') slug: string): Promise<ProductResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findSlug(slug),
    };
  }

  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<ProductResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Create data',
    permission: PRODUCT_TYPE_CREATE,
  })
  @Post('')
  async create(
    @AuthUser() user: User,
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateProductTypeRequestDto,
  ): Promise<ProductResponseDto> {
    const store = await this.stroreService.getStoreByUserId(user.id || '');
    const data = Object.assign(body, { storeId: store?.id });
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(data),
    };
  }

  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody([MaxGroup])) updateData: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, updateData),
    };
  }

  @Put(':id/disable/:boolean')
  async updateDisable(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('boolean') boolean: string,
  ): Promise<ProductResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, { isDisabled: boolean === 'true' ? dayjs().toDate() : null }),
    };
  }

  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<ProductResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}
