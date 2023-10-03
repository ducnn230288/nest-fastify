import { Body, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, Headers, MaxGroup, PaginationQueryDto, Public, SerializerBody } from '@shared';
import { CATEGORY_TYPE_CREATE, CategoryService, CATEGORY_TYPE_UPDATE } from '@service';
import { ListCategoryResponseDto, CategoryResponseDto, CreateCategoryRequestDto, UpdateCategoryRequestDto } from '@dto';

@Headers('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Public({
    summary: 'Get List data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListCategoryResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

  @Public({
    summary: 'Get Detail data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('/slug/:slug')
  async findOneBySlug(@I18n() i18n: I18nContext, @Param('slug') slug: string): Promise<CategoryResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findSlug(slug),
    };
  }

  @Get(':id')
  async fineOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<CategoryResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Create data',
    permission: CATEGORY_TYPE_CREATE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }

  @Auth({
    summary: 'Update data',
    permission: CATEGORY_TYPE_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody([MaxGroup])) body: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }
}
