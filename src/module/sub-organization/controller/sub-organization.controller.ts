import { Body, Get, Param, Post, Put } from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, SerializerBody } from '@shared';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateSubOrganizationRequestDto, UpdateSubOrganizationActiveDto } from '@dto';
import { User } from '@model';
import {
  P_DATA_CREATE,
  P_SUB_ORGANIZATION_CREATE,
  P_SUB_ORGANIZATION_UPDATE,
  P_SUB_ORGANIZATION_UPDATE_ACTIVE_STATUS,
  SubOrganizationService,
} from '@service';
import { async } from 'rxjs';

@Headers('sub-organization')
export class SubOrganizationController {
  constructor(private service: SubOrganizationService) {}

  // @Auth({
  //     summary: 'Create new store',
  //     permission: P_DATA_CREATE,
  // })

  // @Post('')
  // async create(
  //     @I18n() i18n: I18nContext,
  //     @Body(new SerializerBody([MaxGroup])) body : CreateSubOrganizationRequestDto ,
  //     @AuthUser() user: User,
  // ): Promise<any> {
  //     return {
  //         message: i18n.t('common.Create Success'),
  //         data: await this.service.add(body, user),
  //     };

  // }
  @Auth({
    summary: 'update categoy',
    permission: P_SUB_ORGANIZATION_CREATE,
  })
  @Post('')
  async createTest(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateSubOrganizationRequestDto,
    @AuthUser() user: User,
  ): Promise<any> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.add(body, user),
    };
  }
  @Auth({
    summary: 'update categoy',
    permission: P_SUB_ORGANIZATION_UPDATE,
  })
  @Put(':id')
  async updateSubOrganization(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateSubOrganizationRequestDto,
    @AuthUser() user: User,
    @Param('id') id: string,
  ): Promise<any> {
    await this.service.updateSubOrganization(body, id, user);
    return {
      message: i18n.t('common.Update Success'),
      statusCode: 200,
    };
  }
  @Auth({
    summary: 'update category active-status',
    permission: P_SUB_ORGANIZATION_UPDATE_ACTIVE_STATUS,
  })
  @Put(':id/active-status')
  async updateActiveStatusSubOrganization(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: UpdateSubOrganizationActiveDto,
    @Param('id') id: string,
  ) {
    console.log('isactive', body);

    return {
      message: i18n.t('common.Update Success'),
      statusCode: 200,
      data: await this.service.update(id, body),
    };
  }
}
