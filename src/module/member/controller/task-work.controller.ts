/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Delete, ForbiddenException, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, AuthUser, Headers, MaxGroup, SerializerBody, PaginationQueryDto } from '@shared';
import { CreateTaskWorkRequestDto, UpdateTaskWorkRequestDto, TaskWorkResponseDto, ListTaskWorkResponseDto } from '@dto';
import { User } from '@model';
import {
  TaskTimesheetService,
  P_TASKWORK_LISTED,
  P_TASKWORK_CREAETE,
  P_TASKWORK_UPDATE,
  P_TASKWORK_DELETE,
  P_TASKWORK_DETAIL,
  TaskWorkService,
} from '@service';

@Headers('task-work')
export class TaskWorkController {
  constructor(private readonly service: TaskWorkService) {}

  @Auth({
    summary: 'Create data',
    permission: P_TASKWORK_CREAETE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateTaskWorkRequestDto,
  ): Promise<TaskWorkResponseDto> {
    console.log(body);
    const data = await this.service.create(body);
    return {
      message: i18n.t('common.Create Success'),
      data: {},
    };
  }
}
