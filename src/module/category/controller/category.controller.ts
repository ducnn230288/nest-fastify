import { Body, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, Headers, MaxGroup, PaginationQueryDto, Public, SerializerBody } from '@shared';
import { CATRGORY_TYPE_CREATE, CategoryService } from '@service';
import { ListCategoryResponseDto, CategoryResponseDto, CreateCategoryTypeRequestDto } from '@dto';

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

  @Auth({
    summary: 'Create data',
    permission: CATRGORY_TYPE_CREATE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateCategoryTypeRequestDto,
  ): Promise<CategoryResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }
}
