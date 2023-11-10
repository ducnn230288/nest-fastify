import { Body, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Auth, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from "@shared";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateQuestionRequestDto, ListQuestionResponseDto, QuestionResponseDto, UpdateQuestionRequestDto } from "@dto";
import { P_QUESTION_CREATE, P_QUESTION_DELETE, P_QUESTION_DETAIL, P_QUESTION_LISTED, P_QUESTION_UPDATE, QuestionService } from "@service";

@Headers('question')
export class QuestionController {

    constructor(
        private readonly service: QuestionService
    ) { }

    @Auth({
        summary: 'Create question',
        permission: P_QUESTION_CREATE,
        serializeOptions: { groups: [MaxGroup] },
    })
    @Post('')
    async create(
        @I18n() i18n: I18nContext,
        @Body(new SerializerBody()) body: CreateQuestionRequestDto,
    ): Promise<any> {
        return {
            message: i18n.t('common.Create Success'),
            data: await this.service.create(body),
        }
    }


    @Auth({
        summary: 'Get List Team',
        permission: P_QUESTION_LISTED,
    })
    @Get('')
    async findAll(@I18n() i18n: I18nContext, @Query() paginationQuery: PaginationQueryDto): Promise<ListQuestionResponseDto> {
        const [result, total] = await this.service.findAll(paginationQuery);
        return {
            message: i18n.t('common.Get List success'),
            count: total,
            data: result,
        };
    }

    @Auth({
        summary: 'Get List Team',
        permission: P_QUESTION_DETAIL,
    })
    @Get(':id')
    async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<QuestionResponseDto> {
        return {
            message: i18n.t('common.Get List success'),
            data: await this.service.findOne(id, []),
        };
    }

    @Auth({
        summary: 'Update question',
        permission: P_QUESTION_UPDATE,
        serializeOptions: { groups: [MaxGroup] },
    })
    @Put(':id')
    async update(
        @I18n() i18n: I18nContext,
        @Param('id') id: string,
        @Body(new SerializerBody()) body: UpdateQuestionRequestDto,
    ): Promise<QuestionResponseDto | any> {
        return {
            message: i18n.t('common.Update Success'),
            data: await this.service.update(id, body),
        };
    }

    @Auth({
        summary: 'Delete question',
        permission: P_QUESTION_DELETE,
        serializeOptions: { groups: [MaxGroup] },
    })
    @Delete(':id')
    async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<any> {
        return {
            message: i18n.t('common.Delete Success'),
            data: await this.service.remove(id),
        };
    }

}