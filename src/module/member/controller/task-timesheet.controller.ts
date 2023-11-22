import { Body, Delete, Get, Param, Post, Put, Query, Res, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
// import { Response } from 'express';
import {
  CheckInRequestDto,
  CheckOutRequestDto,
  ListTaskTimesheetResponseDto,
  TaskTimesheetResponseDto,
  UpdateTaskTimesheetRequestDto,
} from '@dto';
import { User } from '@model';
import { Auth, AuthUser, Headers, MaxGroup, SerializerBody, PaginationQueryDto } from '@shared';
import { TaskTimesheetService, P_TASKTIMESHEET_LISTED, P_TASKTIMESHEET_DELETE, TaskService } from '@service';

@Headers('task-timesheet')
export class TaskTimesheetController {
  constructor(
    private readonly service: TaskTimesheetService,
    private readonly taskService: TaskService,
  ) {}

  @Auth({
    summary: 'Create data',
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CheckInRequestDto,
    @AuthUser() user: User,
    // @Res({ passthrough: true }) res: Response,
  ): Promise<TaskTimesheetResponseDto> {
    const data = await this.service.checkIn(user, body);
    // res.status(data?.finish ? HttpStatus.OK : HttpStatus.CREATED);
    return {
      message: i18n.t('common.CheckIn Success'),
      data: data,
    };
  }

  @Auth({
    summary: 'Update Data',
  })
  @Put('')
  async checkout(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CheckOutRequestDto,
    @AuthUser() user: User,
  ): Promise<TaskTimesheetResponseDto> {
    const data = await this.service.checkOut(user, body);
    return {
      message: i18n.t('common.CheckOut Success'),
      data: data,
    };
  }

  @Auth({
    summary: 'Get List data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    @AuthUser() user: User,
  ): Promise<ListTaskTimesheetResponseDto> {
    if (user.roleCode !== 'supper_admin' || !user.role?.permissions?.includes(P_TASKTIMESHEET_LISTED))
      paginationQuery.where = [{ userId: user.id }];
    const [result, total] = await this.service.findAll(paginationQuery);

    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail',
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<TaskTimesheetResponseDto> {
    const timesheet = await this.service.findOne(id);
    return {
      message: i18n.t('common.Get Detail success'),
      data: timesheet,
    };
  }

  @Auth({
    summary: 'Update Data',
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) dataUpdate: UpdateTaskTimesheetRequestDto,
  ): Promise<TaskTimesheetResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, dataUpdate),
    };
  }

  @Auth({
    summary: 'Delete Data',
    permission: P_TASKTIMESHEET_DELETE,
  })
  @Delete(':id')
  async delete(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<TaskTimesheetResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}
