import { Body, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { P_TASK_CREATE, P_TASK_LISTED, TaskService } from '@service';
import { CreateTaskRequestDto, ListTaskResponseDto, TaskResponseDto } from '@dto';
import { I18n, I18nContext } from 'nestjs-i18n';

@Headers('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Auth({
    summary: 'Create task',
    permission: P_TASK_CREATE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: CreateTaskRequestDto,
    // @AuthUser() user: User,
  ): Promise<TaskResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }

  // @Auth({
  //   summary: 'Get list data',
  //   permission: P_TASK_LISTED,
  //   serializeOptions: { groups: [MaxGroup] },
  // })
  // @Get('')
  // async getList(
  //   @I18n() i18n: I18nContext,
  //   @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  // ): Promise<ListTaskResponseDto> {
  //   const [result, total] = await this.service.findAll(paginationQuery);
  //   return {
  //     message: i18n.t('common.Get List success'),
  //     count: total,
  //     data: result,
  //   };
  // }
}
