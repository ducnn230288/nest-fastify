import { Auth, Headers, PaginationQueryDto, SerializerBody } from "@shared";
import {
    P_STORE_CREATE,
    P_STORE_DELETE,
    P_STORE_DETAIL,
    P_STORE_LISTED,
    P_STORE_UPDATE,
    StoreService
} from "@service";
import { Body, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateStoreRequestDto, ListStoreResponseDto, StoreResponseDto, UpdateStoreRequestDto } from "@dto";

@Headers('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) { }

    @Auth({
        summary: 'Get List Store',
        permission: P_STORE_LISTED
    })
    @Get('')
    async getAll(
        @I18n() i18n: I18nContext,
        @Query() paginationQuery: PaginationQueryDto
    ): Promise<ListStoreResponseDto> {
        const [result, total] = await this.storeService.findAll(paginationQuery);
        return {
            message: i18n.t('common.Get List success'),
            count: total,
            data: result,
        };
    }

    @Auth({
        summary: 'Get One Store',
        permission: P_STORE_DETAIL
    })
    @Get(':id')
    async getOne(
        @I18n() i18n: I18nContext,
        @Param('id') id: string
    ): Promise<StoreResponseDto> {
        return {
            message: i18n.t('common.Get Detail Success'),
            data: await this.storeService.findOne(id)
        }
    }

    @Auth({
        summary: 'Create Store',
        permission: P_STORE_CREATE
    })
    @Post('')
    async create(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody()) request: CreateStoreRequestDto
    ): Promise<StoreResponseDto> {
        return {
            message: i18n.t('common.Create Success'),
            data: await this.storeService.create(request)
        };
    }

    @Auth({
        summary: 'Update Store',
        permission: P_STORE_UPDATE
    })
    @Put(':id')
    async update(
        @I18n() i18n: I18nContext,
        @Param('id') id: string,
        @Body(new SerializerBody()) request: UpdateStoreRequestDto
    ): Promise<StoreResponseDto> {
        return {
            message: i18n.t('common.Update Success'),
            data: await this.storeService.update(id, request)
        }
    }

    @Auth({
        summary: 'Update Disable Store',
        permission: P_STORE_UPDATE
    })
    @Put(':id/disable/:boolean')
    async disable(
        @I18n() i18n: I18nContext,
        @Param('id') id: string,
        @Param('boolean') boolean: boolean
    ): Promise<StoreResponseDto> {
        return {
            message: i18n.t('common.Update Success'),
            data: await this.storeService.update(id, { isDisabled: boolean ? new Date : null })
        }
    }

    @Auth({
        summary: 'Update Disable Store',
        permission: P_STORE_DELETE
    })
    @Delete(':id')
    async delete(
        @I18n() i18n: I18nContext,
        @Param('id') id: string
    ): Promise<StoreResponseDto> {
        return {
            message: i18n.t('common.Delete Success'),
            data: await this.storeService.remove(id)
        }
    }
}