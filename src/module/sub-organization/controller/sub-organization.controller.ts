import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, SerializerBody } from '@shared';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateSubOrganizationRequestDto, UpdateSubOrganizationActiveDto } from '@dto';
import { User } from '@model';
import {
  P_DATA_CREATE,
  P_SUB_ORGANIZATION_CREATE,
  P_SUB_ORGANIZATION_DELETE,
  P_SUB_ORGANIZATION_GET_ALL_SUPPLIER_BY_ADMIN,
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
    summary: 'create subOrg',
    permission: P_SUB_ORGANIZATION_CREATE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateSubOrganizationRequestDto,
    @AuthUser() user: User,
  ): Promise<any> {
    console.log('b',body);
    
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.add(body, user),
    };
  }
  @Auth({
    summary: 'update subOrg',
    permission: P_SUB_ORGANIZATION_UPDATE,
  })
  @Put(':id')
  async update(
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
    summary: 'update subOrg active-status',
    permission: P_SUB_ORGANIZATION_UPDATE_ACTIVE_STATUS,
  })
  @Put(':id/active-status')
  async updateActiveStatusSubOrganization(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: UpdateSubOrganizationActiveDto,
    @Param('id') id: string,
  ) {    
    return {
      message: i18n.t('common.Update Success'),
      statusCode: 200,
      data: await this.service.update(id, body),
    };
  }
  @Auth({
    summary: 'delete subOrg',
    permission: P_SUB_ORGANIZATION_DELETE,
  })
  @Delete(':id')
  async delete(@I18n() i18n: I18nContext, @Param('id') id: string) {
    await this.service.remove(id);
    return {
      message: i18n.t('common.Delete Success'),
      statusCode: 200,
    };
  }
  @Auth({
    summary: 'get all supplier by admin',
    permission: P_SUB_ORGANIZATION_GET_ALL_SUPPLIER_BY_ADMIN,
  })
  @Get('/admin/all-supplier')
  async getSuppliersByAdmin(
    @I18n() i18n: I18nContext,
    @AuthUser() user: User,
  ){
    return{
      message: i18n.t('common.Get List success'),
      statusCode: 200,
      data: await this.service.getSuppliersByAdmin(user)
    }
  }
}
