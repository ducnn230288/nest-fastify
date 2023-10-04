import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, Headers, MaxGroup, PaginationQueryDto, Public, SerializerBody } from '@shared';
import { CATEGORY_CREATE, CategoryService, CATEGORY_UPDATE, CATEGORY_DETAIL, CATEGORY_DELETE } from '@service';
import { ListCategoryResponseDto, CategoryResponseDto, CreateCategoryRequestDto, UpdateCategoryRequestDto } from '@dto';
import dayjs from 'dayjs';

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

  @Auth({
    summary: 'Get Detail data',
    permission: CATEGORY_DETAIL,
  })
  @Get('/slug/:slug')
  async findOneBySlug(@I18n() i18n: I18nContext, @Param('slug') slug: string): Promise<CategoryResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findSlug(slug),
    };
  }

  @Auth({
    summary: 'Get Detail data',
    permission: CATEGORY_DETAIL,
  })
  @Get(':id')
  async fineOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<CategoryResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Create data',
    permission: CATEGORY_CREATE,
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
    permission: CATEGORY_UPDATE,
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

  @Auth({
    summary: 'Delete a STORE',
    permission: CATEGORY_UPDATE,
  })
  @Put(':id/disable/:boolean')
  async updateDisable(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('boolean') boolean: string,
  ): Promise<CategoryResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, { isDisabled: boolean === 'true' ? dayjs().toDate() : null }),
    };
  }

  @Auth({
    summary: 'Delete a Category',
    permission: CATEGORY_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<CategoryResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}