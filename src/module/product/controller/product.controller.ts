import { Body, Post } from "@nestjs/common";
import { Auth, AuthUser, Headers, SerializerBody } from "@shared";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateProductRequestDto } from "@dto";
import { User } from "@model";
import { P_PRODUCT_CREATE } from "../service/product.service";


@Headers('product')

export class ProductController {

    @Auth({
        summary: 'Tạo sản phẩm',
        permission: P_PRODUCT_CREATE
    })

    @Post()
    create(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody()) body: CreateProductRequestDto,
        @AuthUser() user: User
    ) {
    }

}