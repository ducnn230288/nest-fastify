import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';

import { Auth, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { P_TASKSUB_CREATE, P_TASKSUB_DELETE, P_TASKSUB_LISTED, TaskSubService } from '@service';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateTaskSubRequestDto, ListTaskSubResponeDto, TaskSubResponeDto, UpdateTaskSubRequestDto } from '@dto';

@Headers('task-sub')
export class TaskSubController {
  constructor(private readonly service: TaskSubService) {}

  @Auth({
    summary: 'Create task',
    permission: P_TASKSUB_CREATE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: CreateTaskSubRequestDto,
  ): Promise<TaskSubResponeDto> {
    const taskSub = await this.service.create(body);
    return {
      message: i18n.t('common.Create Success'),
      data: taskSub,
    };
  }

  @Auth({
    summary: 'Get list data',
    serializeOptions: { groups: [MaxGroup] },
    permission: P_TASKSUB_LISTED,
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListTaskSubResponeDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return { message: i18n.t('common.Get List Success'), count: total, data: result };
  }

  @Auth({
    summary: 'Get list data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<TaskSubResponeDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Get list data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdateTaskSubRequestDto,
  ): Promise<TaskSubResponeDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }

  @Auth({
    summary: 'Get list data',
    serializeOptions: { groups: [MaxGroup] },
    permission: P_TASKSUB_DELETE,
  })
  @Delete(':id')
  async delete(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<TaskSubResponeDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}
