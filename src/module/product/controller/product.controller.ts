import { Body, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, Headers, MaxGroup, PaginationQueryDto, Public, SerializerBody } from '@shared';
import { ProductService, PRODUCT_TYPE_CREATE, PRODUCT_TYPE_DETAIL } from '@service';
import { CreateProductTypeRequestDto, ListProductResponseDto, ProductResponseDto } from '@dto';

@Headers('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

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

  @Auth({
    summary: 'Create data',
    permission: PRODUCT_TYPE_CREATE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateProductTypeRequestDto,
  ): Promise<ProductResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }
}
