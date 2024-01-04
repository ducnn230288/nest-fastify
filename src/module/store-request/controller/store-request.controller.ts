import { Body, Get, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { Auth, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from "@shared";
import { CreateStoreRequestDto, RejectStoreRequestDto } from "@dto";
import { I18n, I18nContext } from "nestjs-i18n";
import { P_POST_CREATE, P_STORE_REQUEST_ACCEPT, P_STORE_REQUEST_CREATE, P_STORE_REQUEST_FIND_ALL, P_STORE_REQUEST_FIND_ONE, P_STORE_REQUEST_REJECT, StoreRequestService } from "@service";


@Headers('store-request')
export class StoreRequestController {
    constructor(
        private readonly service: StoreRequestService
    ) {
    }

    @Auth({
        summary: 'Cửa hàng tạo yêu cầu kết nối',
        permission: P_STORE_REQUEST_CREATE,
    })
    @Post('')
    async create(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody([MaxGroup])) body: CreateStoreRequestDto
    ) {
        console.log('vvvv',body);
        
        return {
            message: i18n.t('common.Create Success'),
            data: await this.service.create(body)
        }
    }

    @Auth({
        summary: 'Lấy tất cả dữ liệu',
        permission: P_STORE_REQUEST_FIND_ALL,
        serializeOptions: { groups: [] },
    })
    @Get('')
    async findAll(
        @I18n() i18n: I18nContext,
        @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    ) {        
        const [result, total] = await this.service.findAll(paginationQuery);
        return {
            message: i18n.t('common.Get List success'),
            count: total,
            data: result,
        };
    }

    @Auth({
        summary: 'Lấy một cột dữ liệu',
        permission: P_STORE_REQUEST_FIND_ONE,
    })
    @Get(':id')
    async findOne(
        @I18n() i18n: I18nContext,
        @Param('id') id: string
    ) {
        return {
            message: i18n.t('common.Get Detail Success'),
            data: await this.service.findOne(id)
        }
    }

    @Auth({
        summary: 'Admin từ chối kết nối',
        permission: P_STORE_REQUEST_REJECT,
    })
    @Put('reject/:id')
    async reject(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody()) body: RejectStoreRequestDto,

        @Param('id') id: string
    ) {
        body = Object.assign({ status: 'rejected' }, body)
        return {
            message: i18n.t('common.Update Success'),
            data: await this.service.update(id, body)
        }
    }

    @Auth({
        summary: 'Admin chấp nhận kết nối',
        permission: P_STORE_REQUEST_ACCEPT,
    })
    @Put('accept/:id')
    async accept(
        @I18n() i18n: I18nContext,
        @Param('id') id: string
    ) {
        let body = { status: 'accepted' }
        return {
            message: i18n.t('common.Update Success'),
            data: await this.service.update(id, body)
        }
    }
}