import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import {
  CreateUserAdminRequestDto,
  ListUserAdminResponseDto,
  UpdateUserAdminRequestDto,
  UserAdminResponseDto,
} from '@dto';
import { Auth, Headers, MaxGroup, OnlyUpdateGroup, SerializerBody, PaginationQueryDto } from '@shared';
import {
  P_USER_ADMIN_LISTED,
  P_USER_ADMIN_DETAIL,
  P_USER_ADMIN_CREATE,
  P_USER_ADMIN_UPDATE,
  P_USER_ADMIN_DELETE,
  UserAdminService,
} from '@service';

@Headers('user-admin')
export class UserAdminController {
  constructor(private readonly service: UserAdminService) {}

  @Auth({
    summary: 'Get List User Admin',
    permission: P_USER_ADMIN_LISTED,
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<ListUserAdminResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail User Admin',
    permission: P_USER_ADMIN_DETAIL,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<UserAdminResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Create User Admin',
    permission: P_USER_ADMIN_CREATE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup, OnlyUpdateGroup])) createData: CreateUserAdminRequestDto,
  ): Promise<UserAdminResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(createData),
    };
  }

  @Auth({
    summary: 'Update User Admin',
    permission: P_USER_ADMIN_UPDATE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody([MaxGroup])) updateData: UpdateUserAdminRequestDto,
  ): Promise<UserAdminResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, updateData, async (data) => {
        return data;
      }),
    };
  }

  @Auth({
    summary: 'Delete User Admin',
    permission: P_USER_ADMIN_DELETE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<UserAdminResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}
