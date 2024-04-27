import { BadRequestException, Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
// import { Response } from 'express';
import {
  CheckInRequestDto,
  CheckOutRequestDto,
  ListFindTaskTimesheetResponseDto,
  TaskTimesheetResponseDto,
} from '@dto';
import { User } from '@model';
import { Auth, AuthUser, Headers, MaxGroup, SerializerBody, PaginationQueryDto } from '@shared';
import { TaskTimesheetService, P_TASKTIMESHEET_LISTED, P_TASKTIMESHEET_DELETE } from '@service';

@Headers('task-timesheet')
export class TaskTimesheetController {
  constructor(private readonly service: TaskTimesheetService) {}

  @Auth({
    summary: 'Check In',
  })
  @Post('')
  async checkin(
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
    summary: 'Check Out',
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
    summary: 'Get All',
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    @AuthUser() user: User,
  ): Promise<ListFindTaskTimesheetResponseDto> {
    if (user.roleCode !== 'supper_admin' || !user.role?.permissions?.includes(P_TASKTIMESHEET_LISTED))
      paginationQuery.where = [{ userId: user.id }];
    const [data, count] = await this.service.findAllWithDayOff(paginationQuery);
    return {
      message: i18n.t('common.Get Detail Success'),
      data: data,
      count: count,
    };
  }

  @Auth({
    summary: 'Get Detail Check In',
  })
  @Get('checkin')
  async getCheckIn(
    @I18n() i18n: I18nContext,
    @AuthUser() user: User,
    // @Res({ passthrough: true }) res: Response,
  ): Promise<TaskTimesheetResponseDto> {
    if (!user.id) throw new BadRequestException(i18n.t('common.User id not found', { args: { id: user.id } }));
    const timesheet = await this.service.getCheckIn(user);
    if (!timesheet) throw new BadRequestException(i18n.t('common.User not check in'));
    return {
      message: i18n.t('common.Get Check In success'),
      data: timesheet,
    };
  }

  @Auth({
    summary: 'Get Detail',
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<TaskTimesheetResponseDto> {
    const data = await this.service.findOneWithDayOff(id);

    return {
      message: i18n.t('common.Get Detail Success'),
      data: data,
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
