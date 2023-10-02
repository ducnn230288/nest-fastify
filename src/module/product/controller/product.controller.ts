import { Body, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { ProductService } from '@service';
import { CreateProductTypeRequestDto, ListProductResponseDto, ProductResponseDto } from '@dto';

@Headers('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

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

  @Get('slug/:slug')
  async findBySlug(@I18n() i18n: I18nContext, @Param('slug') slug: string): Promise<ProductResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findSlug(slug),
    };
  }

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
