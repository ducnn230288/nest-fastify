import { Body, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateQuestionTestRequestDto, ListQuestionTestResponseDto, QuestionTestResponseDto } from '@dto';
import { P_QUESTION_TEST_LISTED, P_QUESTION_TEST_DELETE, QuestionTestService } from '@service';
import { User } from '@model';

@Headers('question-test')
export class QuestionTestController {
  constructor(private readonly service: QuestionTestService) {}

  @Auth({
    summary: 'Create question test',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: CreateQuestionTestRequestDto,
    @AuthUser() user: User,
  ): Promise<QuestionTestResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.saveAnswer(body, user),
    };
  }

  @Auth({
    summary: 'Get List data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query() paginationQuery: PaginationQueryDto,
    @AuthUser() user: User,
  ): Promise<ListQuestionTestResponseDto> {
    if (!user?.role?.permissions?.includes(P_QUESTION_TEST_LISTED)) {
      paginationQuery.where = [{ userId: user?.id }];
    }
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<QuestionTestResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_QUESTION_TEST_DELETE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Delete(':id')
  async delete(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<QuestionTestResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}
