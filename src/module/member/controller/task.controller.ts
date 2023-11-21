import {
  BadRequestException,
  Body,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { P_TASK_CREATE, P_TASK_DELETE, P_TASK_DETAIL, P_TASK_LISTED, P_TASK_UPDATE, TaskService } from '@service';
import {
  CreateTaskRequestDto,
  ListTaskResponseDto,
  TaskResponseDto,
  UpdateTaskFinishDto,
  UpdateTaskRequestDto,
} from '@dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { User } from '@model';

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
    @AuthUser() user: User,
  ): Promise<TaskResponseDto> {
    const data = Object.assign(body, { managerId: user.id });
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(data),
    };
  }

  @Auth({
    summary: 'Get list data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('')
  async getList(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListTaskResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get detail',
  })
  @Get(':id')
  async getOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<TaskResponseDto> {
    return {
      message: i18n.t('common.Get Detail success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_TASK_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) dataUpdate: UpdateTaskRequestDto,
    // @AuthUser() user: User
  ): Promise<TaskResponseDto> {
    return {
      message: i18n.t('common.Update data success'),
      data: await this.service.update(id, dataUpdate),
    };
  }

  @Auth({
    summary: 'Update finish time',
    permission: P_TASK_UPDATE,
  })
  @Put('finish/:id')
  async finishTime(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdateTaskFinishDto,
  ): Promise<TaskResponseDto> {
    return {
      message: i18n.t('common.Update data finish success'),
      data: await this.service.updateFinishTime(id, body),
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_TASK_DELETE,
  })
  @Delete(':id')
  async delete(@I18n() i18n: I18nContext, @Param('id') id: string, @AuthUser() user: User): Promise<TaskResponseDto> {
    const task = await this.service.findOne(id, []);
    if (task?.managerId !== user.id) throw ForbiddenException;
    if (task?.status === 0) throw new BadRequestException(i18n.t('common.Task status is processing. Cannot delete.'));
    return {
      message: i18n.t('common.Delete data success'),
      data: await this.service.remove(id),
    };
  }
}
