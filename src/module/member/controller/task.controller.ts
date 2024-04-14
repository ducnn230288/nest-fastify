import { BadRequestException, Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, PaginationQueryDto, SerializerBody } from '@shared';
import { CodeService, P_TASK_CREATE, P_TASK_DELETE, P_TASK_LISTED, P_TASK_UPDATE, TaskService } from '@service';
import { CreateTaskRequestDto, ListTaskResponseDto, TaskResponseDto, UpdateTaskRequestDto } from '@dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ETaskStatus, User } from '@model';

@Headers('task')
export class TaskController {
  constructor(
    private readonly service: TaskService,
    private codeService: CodeService,
  ) {}

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
    if (!body.code) {
      const [, total] = await this.codeService.findAll({ where: [{ code: body.projectCode }] });
      body.code = body.projectCode + `_${total < 10 ? '0' + total : total}`;
    }
    const task = await this.service.createTask(body, user);
    return {
      message: i18n.t('common.Create Success'),
      data: task,
    };
  }

  @Auth({
    summary: 'Get list data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    @AuthUser() user: User,
  ): Promise<ListTaskResponseDto> {
    paginationQuery.sorts = '{"order":"ASC"}';
    // if user is manager or have permission
    if (user.roleCode !== 'supper_admin' && user.role?.permissions?.includes(P_TASK_LISTED))
      paginationQuery.where = [{ managerId: user.id }];

    // if user is a User
    if (user.roleCode !== 'supper_admin' && !user.role?.permissions?.includes(P_TASK_LISTED))
      paginationQuery.where = [{ 'assignees.id': user.id }];

    const [result, total] = await this.service.findAll(paginationQuery);
    // console.log(datas);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get detail',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':id')
  async getOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<TaskResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, ['taskSubs']),
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_TASK_UPDATE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Put(':id/:status')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('status') status: number,
    @Body(new SerializerBody()) body: UpdateTaskRequestDto,
    // @AuthUser() user: User
  ): Promise<TaskResponseDto> {
    const data = await this.service.updateTask(id, status, body);

    return {
      message: i18n.t('common.Update Success'),
      data: data,
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_TASK_DELETE,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Delete(':id')
  async delete(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<TaskResponseDto> {
    const task = await this.service.findOne(id, []);
    // if (task?.managerId !== user.id) throw ForbiddenException;
    if (task?.status === ETaskStatus.Processing)
      throw new BadRequestException(i18n.t('common.Task status is processing. Cannot delete.'));
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}
