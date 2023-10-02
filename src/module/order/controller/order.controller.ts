import { Body, Get, Post, Query, ValidationPipe } from "@nestjs/common";
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from "@shared";
import { I18n, I18nContext } from "nestjs-i18n";
import { OrderService, P_ORDER_CREATE, P_ORDER_LISTED } from "@service";
import { ListOrderResponseDto } from "@dto";
import { User } from "@model";


@Headers('order')
export class OrderController {
    constructor(private readonly service: OrderService) { }

    @Auth({
        summary: 'Get List data',
        permission: P_ORDER_LISTED,
        // serializeOptions: { groups: [] },
    })
    @Get('list')
    async findAll(
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
        summary: 'Create data',
        permission: P_ORDER_CREATE,
      })
      @Post('add')
      async create(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody([MaxGroup])) body,
      ): Promise<ListOrderResponseDto | any> {
        return {
          message: i18n.t('common.Create Success'),
          data: await this.service.create(body),
        };
      }
}