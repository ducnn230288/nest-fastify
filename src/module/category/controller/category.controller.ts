import { Body, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, AuthUser, Headers, MaxGroup, OnlyUpdateGroup, PaginationQueryDto, SerializerBody } from "@shared";
import { CategoryService, P_CATEGORY_CREATE, P_CATEGORY_DELETE, P_CATEGORY_DETAIL, P_CATEGORY_LISTED, P_CATEGORY_UPDATE } from "@service";

import { Category, User } from '@model';
import { CategoryResponseDto, CreateCategoryRequestDto, DefaultCategoryResponseDto, ListCategoryResponseDto, UpdateCategoryRequestDto } from "@dto";
import dayjs from "dayjs";

@Headers('category')
export class CategoryController {
    constructor(readonly categoryService: CategoryService) { }

    @Auth({
        summary: 'Get List Category',
        permission: P_CATEGORY_LISTED
    })
    @Get('')
    async getAll(
        @I18n() i18n: I18nContext,
        @Query() paginationQueryDto: PaginationQueryDto
    ): Promise<ListCategoryResponseDto> {
        const [result, total] = await this.categoryService.findAll(paginationQueryDto);

        return {
            message: i18n.t('common.Get List success'),
            count: total,
            data: result,
        };
    }

    @Auth({
        summary: 'Get One Category',
        permission: P_CATEGORY_DETAIL
    })
    @Get(':id')
    async getOne(
        @I18n() i18n: I18nContext,
        @Param('id') id: string
    ): Promise<CategoryResponseDto> {
        return {
            message: i18n.t('common.Get Detail Success'),
            data: await this.categoryService.findOne(id, [])
        }
    }


    @Auth({
        summary: 'Create Category',
        permission: P_CATEGORY_CREATE
    })
    @Post('')
    async create(
        @I18n() i18n: I18nContext,
        @AuthUser() user: User,
        @Body(new SerializerBody()) request: CreateCategoryRequestDto
    ): Promise<CategoryResponseDto> {
        return {
            message: i18n.t('common.Create Success'),
            data: await this.categoryService.create({ createdById: user.id!, ...request })
        };
    }

    @Auth({
        summary: 'Update Category',
        permission: P_CATEGORY_UPDATE
    })
    @Put(':id')
    async update(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody()) body: UpdateCategoryRequestDto,
        @Param('id') id: string
    ): Promise<CategoryResponseDto> {
        return {
            message: i18n.t('common.Update Success'),
            data: await this.categoryService.update(id, body)
        };
    }

    @Auth({
        summary: "Update Disable Category",
        permission: P_CATEGORY_UPDATE
    })
    @Put(':id/disable/:boolean')
    async disable(
        @I18n() i18n: I18nContext,
        @Param('id') id: string,
        @Param('boolean') boolean: boolean
    ): Promise<CategoryResponseDto> {
        return {
            message: i18n.t("common.Update Success"),
            data: await this.categoryService.update(id, { isDisabled: boolean ? new Date() : null })
        }
    }

    @Auth({
        summary: 'Delete Category',
        permission: P_CATEGORY_DELETE
    })
    @Delete(':id')
    async delete(
        @I18n() i18n: I18nContext,
        @Param('id') id: string
    ): Promise<CategoryResponseDto> {
        return {
            message: i18n.t('common.Delete Success'),
            data: await this.categoryService.remove(id)
        }
    }
}