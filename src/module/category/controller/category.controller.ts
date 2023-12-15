import { Auth, AuthUser, Headers, SerializerBody } from "@shared";
import { CategoryService } from "../service/category.service";
import { Body, Post } from "@nestjs/common";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateCategoryRequestDto } from "../dto";
import { User } from "@model";
import { Connection } from "typeorm";


@Headers('category')

export class CategoryController {
    constructor(
        private categoryService : CategoryService,
        private readonly connection: Connection,
    ) {

    }

    // @Auth({
    //     summary: 'Create new store',
    //     // permission: P_DATA_LISTED,
    //     serializeOptions: { groups: [] },
    // })

    @Post('')
    async create(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody()) body: CreateCategoryRequestDto,
       // @AuthUser() user: User,
    ) {
        return{
            message: i18n.t('common.Create Success'),
            data:await this.categoryService.addCategory(body)
        } 
        
    }
} 


