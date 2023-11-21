import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { IsOptional, IsPositive, IsNumber, IsString } from 'class-validator';
import { I18n, I18nContext } from 'nestjs-i18n';
import {
  CreateQuestionRequestDto,
  GetAllQuestionRequestDto,
  ListQuestionResponseDto,
  QuestionResponseDto,
  RequestFindQuestion,
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
import { User } from '@model';

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
    @Query() query: RequestFindQuestion,
    @AuthUser() user: User,
  ): Promise<ListQuestionResponseDto> {
    const [result, total] =
      user.roleCode === 'supper_admin' || user.role?.permissions?.includes(P_QUESTION_LISTED)
        ? await this.service.findAll({
            where: [{ level: Number(query.level) }, { typeCode: query.typeCode?.toString() }],
          })
        : await this.service.getManyQuestionForTest(Number(query.level), query!.typeCode!.toString());
    return {
      message: i18n.t('common.Get List success'),
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
      message: i18n.t('common.Get Detail success'),
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
