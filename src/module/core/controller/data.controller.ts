import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import dayjs from 'dayjs';

import {
  DataResponseDto,
  ListDataResponseDto,
  CreateDataRequestDto,
  UpdateDataRequestDto,
  ArrayDataResponseDto,
} from '@dto';
import { DataService, P_DATA_LISTED, P_DATA_CREATE, P_DATA_UPDATE, P_DATA_DELETE, P_DATA_DETAIL } from '@service';
import { Auth, Headers, MaxGroup, Public, SerializerBody, PaginationQueryDto, AuthUser } from '@shared';
import { User } from '@model';
import { createLogger } from 'winston';

@Headers('data')
export class DataController {
  constructor(private readonly service: DataService) {}

  @Auth({
    summary: 'Get List data',
    serializeOptions: { groups: [] },
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    @AuthUser() user: User,
  ): Promise<ListDataResponseDto> {
    if (user.roleCode != 'super_admin') paginationQuery.where = [{ userId: user.id }];
    // console.log(paginationQuery);
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Array data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('/array')
  async findOneByArray(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) query: PaginationQueryDto,
  ): Promise<ArrayDataResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: query.array ? await this.service.findArrayCode(query.array) : {},
    };
  }

  @Auth({
    summary: 'Get Detail data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<DataResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Create data',
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateDataRequestDto,
    @AuthUser() user: User,
  ): Promise<DataResponseDto> {
    const data = Object.assign(body, { userId: user.id });
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(data),
    };
  }

  @Auth({
    summary: 'Update data',
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody([MaxGroup])) body: UpdateDataRequestDto,
  ): Promise<DataResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Update disable',
  })
  @Put(':id/disable/:boolean')
  async updateDisable(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('boolean') boolean: string,
  ): Promise<DataResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, { isDisabled: boolean === 'true' ? dayjs().toDate() : null }),
    };
  }

  @Auth({
    summary: 'Delete data',
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<DataResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.removeHard(id),
    };
  }
}
