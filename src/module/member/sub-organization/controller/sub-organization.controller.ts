import { Body, Post } from "@nestjs/common";
import { Auth, AuthUser, Headers, SerializerBody } from "@shared";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateSubOrganizationRequestDto } from "@dto";
import { User } from "@model";
import { SubOrganizationService } from "@service";




@Headers('sub-organization')

export class SubOrganizationController {
    constructor(
        private service : SubOrganizationService
    ) {

    }

    @Auth({
        summary: 'Create new store',
        // permission: P_DATA_LISTED,
        serializeOptions: { groups: [] },
    })

    @Post('')
    async create(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody()) body: CreateSubOrganizationRequestDto,
        @AuthUser() user: User,
    ) {
    console.log(body);
    
    }
} 


