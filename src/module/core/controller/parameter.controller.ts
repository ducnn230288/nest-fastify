import { BadRequestException, Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import dayjs from 'dayjs';

import { Auth, Headers, MaxGroup, Public, SerializerBody, PaginationQueryDto, AuthUser } from '@shared';
import {
  ParameterResponseDto,
  ListParameterResponseDto,
  CreateParameterRequestDto,
  UpdateParameterRequestDto,
} from '@dto';
import {
  ParameterService,
  P_PARAMETER_LISTED,
  P_PARAMETER_CREATE,
  P_PARAMETER_UPDATE,
  P_PARAMETER_DELETE,
} from '@service';
import { User } from '@model';

@Headers('parameter')
export class ParameterController {
  constructor(private readonly service: ParameterService) {}

  @Auth({
    summary: 'Get List data',
    // permission: P_PARAMETER_LISTED,
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @AuthUser() authUser: User,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListParameterResponseDto> {
    if (authUser.roleCode !== 'super_admin')
      paginationQuery.where = [
        {
          userId: authUser.id,
        },
      ];
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  @Public({
    summary: 'Get Detail data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':code')
  async findOne(@I18n() i18n: I18nContext, @Param('code') code: string): Promise<ParameterResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(code),
    };
  }

  @Auth({
    summary: 'Create data',
    // permission: P_PARAMETER_CREATE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @AuthUser() authUser: User,
    @Body(new SerializerBody()) body: CreateParameterRequestDto,
  ): Promise<ParameterResponseDto> {
    body['userId'] = authUser.id;
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }

  @Auth({
    summary: 'Update data',
    // permission: P_PARAMETER_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @AuthUser() authUser: User,
    @Param('id') id: string,
    @Body(new SerializerBody([MaxGroup])) body: UpdateParameterRequestDto,
  ): Promise<ParameterResponseDto> {
    const data = await this.service.findOneById(id, ['userId']);
    if (data?.userId !== authUser.id) {
      throw new BadRequestException(i18n.t('common.User id not found', { args: { id } }));
    }
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Update disable',
    permission: P_PARAMETER_UPDATE,
  })
  @Put(':id/disable/:boolean')
  async updateDisable(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('boolean') boolean: string,
  ): Promise<ParameterResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, { isDisabled: boolean === 'true' ? dayjs().toDate() : null }),
    };
  }

  @Auth({
    summary: 'Delete data',
    // permission: P_PARAMETER_DELETE,
  })
  @Delete(':id')
  async remove(
    @I18n() i18n: I18nContext,
    @AuthUser() authUser: User,
    @Param('id') id: string,
  ): Promise<ParameterResponseDto> {
    const data = await this.service.findOneById(id, ['userId']);
    // console.log(data);
    // console.log(authUser.id);
    if (data?.userId !== authUser.id) {
      throw new BadRequestException(i18n.t('common.User id not found', { args: { id } }));
    }

    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.removeHard(id),
    };
  }
}
