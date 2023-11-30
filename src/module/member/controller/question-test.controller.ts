import { Body, Get, Post, Query } from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateQuestionRequestDto, CreateQuestionTestRequestDto } from '@dto';
import {
  P_QUESTION_CREATE,
  P_QUESTION_TEST_CREATE,
  P_QUESTION_TEST_LISTED,
  QuestionService,
  QuestionTestService,
} from '@service';
import { User } from '@model';

@Headers('question-test')
export class QuestionTestController {
  constructor(private readonly service: QuestionTestService) {}

  @Auth({
    summary: 'Create question test',
    permission: P_QUESTION_TEST_CREATE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: CreateQuestionTestRequestDto,
    @AuthUser() user: User,
  ): Promise<any> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.saveAnswer(body, user),
    };
  }

  @Auth({
    summary: 'Get list data',
    permission: P_QUESTION_TEST_LISTED,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query() paginationQuery: PaginationQueryDto,
    @AuthUser() user: User,
  ): Promise<any> {
    if (!user?.role?.permissions?.includes(P_QUESTION_TEST_LISTED)) {
      paginationQuery.where = [{ userId: user?.id }];
    }
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }
}
