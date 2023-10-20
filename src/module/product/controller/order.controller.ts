import { Body, Delete, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { I18n, I18nContext } from 'nestjs-i18n';
import { OrderService, P_ORDER_CREATE, P_ORDER_LISTED, P_ORDER_DELETE } from '@service';
import { CreateOrderRequestDto, ListOrderResponseDto, OrderResponseDto } from '@dto';
import { User } from '@model';

@Headers('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Auth({
    summary: 'Get List data',
    permission: P_ORDER_LISTED,
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListOrderResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

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
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

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
      message: i18n.t('common.Get List success'),
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
  ): Promise<ListOrderResponseDto | any> {
    const data = await this.service.createOrder(body, user!.id!);
    return {
      message: i18n.t('common.Create Success'),
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
