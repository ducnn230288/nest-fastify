import { Body, Delete, ForbiddenException, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, AuthUser, Headers, MaxGroup, SerializerBody, PaginationQueryDto } from '@shared';
import {
  DayoffResponseDto,
  ListDayoffResponseDto,
  CreateDayoffRequestDto,
  UpdateDayoffRequestDto,
  StatusDayoffRequestDto,
} from '@dto';
import { User } from '@model';
import {
  DayoffService,
  P_DAYOFF_LISTED,
  P_DAYOFF_DETAIL,
  P_DAYOFF_CREATE,
  P_DAYOFF_UPDATE,
  P_DAYOFF_DELETE,
  P_DAYOFF_UPDATE_STATUS,
} from '@service';

@Headers('dayoff')
export class DayoffController {
  constructor(private readonly service: DayoffService) {}

  @Auth({
    summary: 'Get List data',
    permission: P_DAYOFF_LISTED,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('list')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    @AuthUser() user: User,
  ): Promise<ListDayoffResponseDto> {
    if (!user?.role?.permissions?.includes(P_DAYOFF_UPDATE_STATUS)) {
      paginationQuery.where = [{ staffId: user?.id }];
    }
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail data',
    permission: P_DAYOFF_DETAIL,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<DayoffResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, [], i18n),
    };
  }

  @Auth({
    summary: 'Create data',
    permission: P_DAYOFF_CREATE,
  })
  @Post('add')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: CreateDayoffRequestDto,
    @AuthUser() user: User,
  ): Promise<any> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.createDayOff(body, user, i18n),
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_DAYOFF_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdateDayoffRequestDto,
    @AuthUser() user: User,
  ): Promise<DayoffResponseDto> {
    const dayOff = await this.service.findOne(id, [], i18n);
    if (!!dayOff && dayOff.staffId !== user.id) throw ForbiddenException;

    const data = await this.service.update(id, body, i18n);
    await this.service.updateStaff(user, i18n);
    return { message: i18n.t('common.Update Success'), data };
  }

  @Auth({
    summary: 'Update data status',
    permission: P_DAYOFF_UPDATE_STATUS,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Put(':id/status')
  async updateStatus(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) body: StatusDayoffRequestDto,
    @AuthUser() user: User,
  ): Promise<DayoffResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.updateStatus(id, body, user, i18n),
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_DAYOFF_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string, @AuthUser() user: User): Promise<DayoffResponseDto> {
    const dayOff = await this.service.findOne(id, [], i18n);
    if (!!dayOff && dayOff.staffId !== user.id) throw ForbiddenException;

    const data = await this.service.remove(id, i18n);
    await this.service.updateStaff(user, i18n);
    return { message: i18n.t('common.Delete Success'), data };
  }
}
