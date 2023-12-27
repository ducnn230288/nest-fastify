import { Body, Delete, Get, Param, Post, Put, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from "@shared";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateCategoryRequestDto, UpdateCategoryRequestDto } from "@dto";
import { User } from "@model";
import { CategoryService, P_CATEGORY_CREATE, P_CATEGORY_DELETE, P_CATEGORY_FINDALL, P_CATEGORY_FINDONE, P_CATEGORY_UPDATE } from "@service";
import { UUID } from "crypto";
import { async } from "rxjs";

@Headers('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService,

    ) { }

    @Auth({
        summary: 'create category',
        permission: P_CATEGORY_CREATE
    })
    @Post('')
    async create(@I18n() i18n: I18nContext,
        @Body(new SerializerBody()) body: CreateCategoryRequestDto,
        @AuthUser() user: User,
    ) : Promise<any> {
        return {
            message: i18n.t('common.Create Success'),
            data: await this.categoryService.addCategory(body, user)
        };

    }
    @Auth({
        summary: 'find one ',
        permission: P_CATEGORY_FINDONE
    })
    @Get(":id")
    async getOne(
        @I18n() i18n: I18nContext,
        @AuthUser() user: User,
        @Param('id') id: string
    ) : Promise<any> {
        return {
            message: i18n.t('common.Get Detail Success'),
            data: await this.categoryService.findOne(id)
        };
    }
    @Auth({
        summary: 'update categoy',
        permission: P_CATEGORY_UPDATE
    })
    @Put(":id")
    async updateOne(
        @I18n() i18n: I18nContext,
        @Param('id') id: string,
        @Query('name') name: string,
    ) : Promise<any> {
        
        return {
            message: i18n.t('common.Update Success'),
            data: await this.categoryService.update(id, { name:name, updatedAt: new Date() })
        };
    }
    @Delete(":id")
    @Auth({
        summary: 'delete category',
        permission: P_CATEGORY_DELETE
    })
    async deleteOne(
        @I18n() i18n: I18nContext,
        @AuthUser() user: User,
        @Param('id') id: string,
    ) : Promise<any> {
        return {
            message: i18n.t('common.Delete Success'),
            data: await this.categoryService.remove(id)
        };
    }
    @Auth({
        summary: 'find all category',
        permission: P_CATEGORY_FINDALL
    })
    @Get('/findAll')
    async findAll(
        @I18n() i18n: I18nContext,
        @AuthUser() user: User,
        @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    ) : Promise<any> {
        const [result, total] = await this.categoryService.findAll(paginationQuery);
        return {
            message: i18n.t('common.Get List success'),
            count: total,
            data: result,
        };
    }
}