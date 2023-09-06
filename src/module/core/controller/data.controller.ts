import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import dayjs from 'dayjs';

import {
  DataResponseDto,
  ListDataResponseDto,
  CreateDataRequestDto,
  UpdateDataRequestDto,
  ArrayDataTypeResponseDto,
} from '@dto';
import { DataService, P_DATA_LISTED, P_DATA_CREATE, P_DATA_UPDATE, P_DATA_DELETE, FileService } from '@service';
import { Auth, Headers, MaxGroup, Public, SerializerBody, PaginationQueryDto, getImages } from '@shared';
import { Data } from '@model';

@Headers('data')
export class DataController {
  constructor(
    private readonly service: DataService,
    public fileService: FileService,
  ) {}

  @Auth({
    summary: 'Get List data',
    permission: P_DATA_LISTED,
    serializeOptions: { groups: [] },
  })
  @Get('list')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListDataResponseDto> {
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
  @Get('/array')
  async findOneByArray(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) query: PaginationQueryDto,
  ): Promise<ArrayDataTypeResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: query.array ? await this.service.findArrayCode(query.array) : {},
    };
  }

  @Public({
    summary: 'Get Detail data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<DataResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, [], i18n),
    };
  }

  @Auth({
    summary: 'Create data',
    permission: P_DATA_CREATE,
  })
  @Post('add')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateDataRequestDto,
  ): Promise<DataResponseDto> {
    const data = await this.service.create(body, i18n);
    await this.fileService.activeFiles(getImages<Data>(['image'], data, ['translations'])[0], i18n);
    return {
      message: i18n.t('common.Create Success'),
      data,
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_DATA_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody([MaxGroup])) body: UpdateDataRequestDto,
  ): Promise<DataResponseDto> {
    const oldData = await this.service.findOne(id, [], i18n);
    const data = await this.service.update(id, body, i18n);
    const [listFilesActive, listFilesRemove] = getImages<Data>(['image'], data, ['translations'], oldData);
    await this.fileService.activeFiles(listFilesActive, i18n);
    await this.fileService.removeFiles(listFilesRemove, i18n);
    return {
      message: i18n.t('common.Update Success'),
      data,
    };
  }

  @Auth({
    summary: 'Update disable',
    permission: P_DATA_UPDATE,
  })
  @Put(':id/disable/:boolean')
  async updateDisable(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('boolean') boolean: string,
  ): Promise<DataResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, { isDisabled: boolean === 'true' ? dayjs().toDate() : undefined }, i18n),
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_DATA_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<DataResponseDto> {
    const data = await this.service.removeHard(id, i18n);
    await this.fileService.removeFiles(getImages<Data>(['image'], data, ['translations'])[0], i18n);

    return {
      message: i18n.t('common.Delete Success'),
      data,
    };
  }
}
