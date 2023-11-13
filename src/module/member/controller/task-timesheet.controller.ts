/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Response } from 'express';
import { Auth, AuthUser, Headers, MaxGroup, SerializerBody, PaginationQueryDto } from '@shared';
import {
  CheckInOrOutRequestDto,
  CreateTaskTimesheetRequestDto,
  ListTaskTimesheetResponseDto,
  TaskTimesheetResponseDto,
  UpdateTaskTimesheetRequestDto,
} from '@dto';
import { User } from '@model';
import {
  TaskTimesheetService,
  P_TASKTIMESHEET_LISTED,
  P_TASKTIMESHEET_CREAETE,
  P_TASKTIMESHEET_UPDATE,
  P_TASKTIMESHEET_DELETE,
  P_TASKTIMESHEET_DETAIL,
} from '@service';

@Headers('task-timesheet')
export class TaskTimesheetController {
  constructor(private readonly service: TaskTimesheetService) {}

  @Auth({
    summary: 'Create data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post(':checkin')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CheckInOrOutRequestDto,
    @AuthUser() user: User,
    @Res({ passthrough: true }) res: Response,
    @Param('checkin') checkIn: string,
  ): Promise<TaskTimesheetResponseDto> {
    if (checkIn !== 'true' && checkIn !== 'false') throw new NotFoundException(i18n.t('Page not found'));
    const check: boolean = checkIn === 'true' ? true : false;

    const data = await this.service.checkInOrOut(check, user, body);
    res.status(check ? HttpStatus.CREATED : HttpStatus.OK);
    return {
      message: i18n.t(check ? 'common.Create Success' : 'common.Checkout Success'),
      data: data,
    };
  }

  @Auth({
    summary: 'Get List data',
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
    return {
      message: i18n.t('common.Get Detail success'),
      data: await this.service.findOne(id, []),
    };
  }

  // @Auth({
  //   summary: 'Update Data',
  // })
  // @Put(':id/checkout')
  // async checkout(
  //   @I18n() i18n: I18nContext,
  //   @Param('id') id: string,
  //   @Body(new SerializerBody()) body: CheckOutRequestDto,
  //   @AuthUser() user: User,
  // ): Promise<TaskTimesheetResponseDto> {
  //   const data = await this.service.checkout(id, user, body);
  //   return {
  //     message: i18n.t('common.Checkout Success'),
  //     data: {},
  //   };
  // }

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
