import { Body, Post } from "@nestjs/common";
import { Auth, AuthUser, Headers, MaxGroup, SerializerBody } from "@shared";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateSubOrganizationRequestDto } from "@dto";
import { User } from "@model";
import { P_DATA_CREATE, P_SUB_ORGANIZATION_CREATE, SubOrganizationService } from "@service";




@Headers('sub-organization')
export class SubOrganizationController {
    constructor(
        private service : SubOrganizationService
    ) { }

    @Auth({
        summary: 'Create new store',
        permission: P_DATA_CREATE,
    })

    @Post('')
    async create(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody([MaxGroup])) body : CreateSubOrganizationRequestDto ,
        @AuthUser() user: User,
    ): Promise<any> {
        return {
            message: i18n.t('common.Create Success'),
            data: await this.service.createSubOrg(body, user),
        }

    }
    @Auth({
        summary: 'update categoy',
        permission: P_SUB_ORGANIZATION_CREATE
    })
    @Post('/createTest')
    async createTest(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody([MaxGroup])) body : CreateSubOrganizationRequestDto ,
        @AuthUser() user: User,
    ): Promise<any> {
        return {
            message: i18n.t('common.Create Success'),
            data: await this.service.createSubOrgTest(body, user),
        }

    }
}


