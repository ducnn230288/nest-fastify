import { CreateStoreRequestDto, ListStoreResponseDto, StoreResponseDto, UpdateStoreRequestDto } from '@dto';
import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StoreService, STORE_LISTED, STORE_DETAIL, STORE_CREATE, STORE_UPDATE, STORE_DELETE } from '@service';
import { Auth, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import dayjs from 'dayjs';
import { I18n, I18nContext } from 'nestjs-i18n';

@Headers('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Auth({
    summary: 'Create a STORE',
    permission: STORE_CREATE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateStoreRequestDto,
  ): Promise<StoreResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.storeService.create(body),
    };
  }

  @Auth({
    summary: 'Get List STORE',
    permission: STORE_LISTED,
  })
  @Get('')
  async getAll(@I18n() i18n: I18nContext, @Query() paginationQuery: PaginationQueryDto): Promise<ListStoreResponseDto> {
    const [result, total] = await this.storeService.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get detail a STORE',
    permission: STORE_DETAIL,
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<StoreResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.storeService.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Update a STORE',
    permission: STORE_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody([MaxGroup])) updateData: UpdateStoreRequestDto,
  ): Promise<StoreResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.storeService.update(id, updateData),
    };
  }

  @Auth({
    summary: 'Delete a STORE',
    permission: STORE_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<StoreResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.storeService.removeHard(id),
    };
  }

  @Auth({
    summary: 'Delete a STORE',
    permission: STORE_UPDATE,
  })
  @Put(':id/disable/:boolean')
  async updateDisable(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('boolean') boolean: string,
  ): Promise<StoreResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.storeService.update(id, { isDisabled: boolean === 'true' ? dayjs().toDate() : null }),
    };
  }
}
