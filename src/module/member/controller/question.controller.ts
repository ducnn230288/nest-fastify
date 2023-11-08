import { Body, Post } from "@nestjs/common";
import { Auth, Headers, MaxGroup, SerializerBody } from "@shared";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateQuestionRequestDto } from "@dto";
import { P_QUESTION_CREATE, QuestionService } from "@service";

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
}