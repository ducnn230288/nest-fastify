import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { I18n, I18nContext } from 'nestjs-i18n';
import {
  CreateQuestionRequestDto,
  ListQuestionResponseDto,
  QueryFindQuestionDto,
  QuestionResponseDto,
  UpdateQuestionRequestDto,
} from '@dto';
import {
  P_QUESTION_CREATE,
  P_QUESTION_DELETE,
  P_QUESTION_DETAIL,
  P_QUESTION_LISTED,
  P_QUESTION_UPDATE,
  QuestionService,
} from '@service';
import { Question, User } from '@model';

@Headers('question')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @Auth({
    summary: 'Create question',
    permission: P_QUESTION_CREATE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: CreateQuestionRequestDto,
  ): Promise<QuestionResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }

  @Auth({
    summary: 'Get List data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) query: QueryFindQuestionDto,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    @AuthUser() user: User,
  ): Promise<ListQuestionResponseDto> {
    let [result, total]: [Question[], number] = [[], 0];

    if (user.roleCode === 'supper_admin' || user.role?.permissions?.includes(P_QUESTION_LISTED)) {
      paginationQuery.where = [];
      if (query.level) paginationQuery.where = [{ level: query.level }, ...paginationQuery.where];
      if (query.typeCode) paginationQuery.where = [{ typeCode: query.typeCode }, ...paginationQuery.where];
      [result, total] = await this.service.findAll(paginationQuery);
    } else {
      [result, total] = await this.service.getManyQuestionForTest(query.level!, query.typeCode!);
    }

    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail data',
    permission: P_QUESTION_DETAIL,
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<QuestionResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_QUESTION_UPDATE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdateQuestionRequestDto,
  ): Promise<QuestionResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_QUESTION_DELETE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<QuestionResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}
