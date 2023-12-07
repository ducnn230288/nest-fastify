import { Body, Post } from "@nestjs/common";
import { Auth, AuthUser, Headers, SerializerBody } from "@shared";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateSubOrganizationRequestDto } from "@dto";
import { User } from "@model";




@Headers('sub-organization')

export class SubOrganizationController {

    @Auth({
        summary: 'Tạo đơn vị mới',
        // permission: P_DATA_LISTED,
        serializeOptions: { groups: [] },
    })

    @Post('')
    async create(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody()) body: CreateSubOrganizationRequestDto,
        @AuthUser() user: User,
    ) {

    }
} 


