import { Auth, Headers, PaginationQueryDto, SerializerBody } from "@shared";
import { P_PRODUCT_CREATE, P_PRODUCT_DELETE, P_PRODUCT_DETAIL, P_PRODUCT_LISTED, P_PRODUCT_UPDATE, ProductService } from "@service";
import { Body, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateProductRequestDto, ListProductResponseDto, ProductResponseDto, UpdateProductRequestDto } from "@dto";

@Headers('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Auth({
        summary: 'Get List Product',
        permission: P_PRODUCT_LISTED
    })
    @Get('')
    async getAll(
        @I18n() i18n: I18nContext,
        @Query() paginationQuery: PaginationQueryDto
    ): Promise<ListProductResponseDto> {
        const [result, total] = await this.productService.findAll(paginationQuery);
        return {
            message: i18n.t('common.Get List success'),
            count: total,
            data: result
        }
    }

    @Auth({
        summary: 'Get List Product',
        permission: P_PRODUCT_DETAIL
    })
    @Get(':id')
    async getOne(
        @I18n() i18n: I18nContext,
        @Param('id') id: string
    ): Promise<ProductResponseDto> {
        return {
            message: i18n.t('common.Get Detail Success'),
            data: await this.productService.findOne(id)
        }
    }

    @Auth({
        summary: 'Get List Product',
        permission: P_PRODUCT_CREATE
    })
    @Post('')
    async create(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody()) request: CreateProductRequestDto
    ): Promise<ProductResponseDto> {
        return {
            message: i18n.t('common.Create Success'),
            data: await this.productService.create(request)
        }
    }

    @Auth({
        summary: 'Get List Product',
        permission: P_PRODUCT_UPDATE
    })
    @Put(':id')
    async update(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody()) request: UpdateProductRequestDto,
        @Param('id') id: string
    ): Promise<ProductResponseDto> {
        return {
            message: i18n.t("common.Update Success"),
            data: await this.productService.update(id, request)
        }
    }

    @Auth({
        summary: 'Get List Product',
        permission: P_PRODUCT_UPDATE
    })
    @Put(':id/:boolean')
    async updateDisable(
        @I18n() i18n: I18nContext,
        @Param('id') id: string,
        @Param('boolean') boolean: boolean
    ): Promise<ProductResponseDto> {
        return {
            message: i18n.t("common.Update Success"),
            data: await this.productService.update(id, { isDisabled: boolean ? new Date() : null })
        }
    }

    @Auth({
        summary: 'Get List Product',
        permission: P_PRODUCT_DELETE
    })
    @Delete(':id')
    async delete(
        @I18n() i18n: I18nContext,
        @Param('id') id: string
    ): Promise<ProductResponseDto> {
        return {
            message: i18n.t("common.Delete Success"),
            data: await this.productService.remove(id)
        }

    }
}