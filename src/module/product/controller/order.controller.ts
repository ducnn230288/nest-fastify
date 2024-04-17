import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { OrderService, P_ORDER_LISTED, P_ORDER_DELETE, UserService, P_ORDER_UPDATE } from '@service';
import { CreateOrderRequestDto, ListOrderResponseDto, OrderResponseDto } from '@dto';
import { User } from '@model';

@Headers('order')
export class OrderController {
  constructor(
    private readonly service: OrderService,
    private readonly userService: UserService,
  ) {}

  @Auth({
    summary: 'Get List data',
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @AuthUser() user: User,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListOrderResponseDto> {
    if (user.roleCode !== 'supper_admin') paginationQuery.where = [{ userId: user.id }];
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }
  /*
  @Auth({
    summary: 'Get List data',
  })
  @Get('user')
  async findByUser(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    @AuthUser() user: User,
  ): Promise<ListOrderResponseDto> {
    if (user && user.id) {
      paginationQuery.where = [{ userId: user.id }];
    }
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }
  */
  @Auth({
    summary: 'Get List data',
    permission: P_ORDER_LISTED,
  })
  @Get('store/:storeId')
  async findByStore(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    @Param('storeId') storeId: string,
  ): Promise<ListOrderResponseDto> {
    paginationQuery.where = [{ productStoreId: storeId }];
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Create data',
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateOrderRequestDto,
    @AuthUser() user: User,
  ): Promise<ListOrderResponseDto> {
    user = (await this.userService.findOne(user!.id!)) as User;
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.createOrder(body, user),
    };
  }

  @Auth({
    summary: 'Update status data',
    permission: P_ORDER_UPDATE,
  })
  @Put(':id/:status')
  async changeStatus(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('status') status: string,
  ): Promise<OrderResponseDto> {
    const { data, message } = await this.service.updateStatus(id, parseInt(status));
    return {
      message: i18n.t(`common.StatusOrder.${message}`),
      data: data,
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_ORDER_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<OrderResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}
