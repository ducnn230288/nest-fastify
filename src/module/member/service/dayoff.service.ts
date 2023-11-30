import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import dayjs from 'dayjs';

import { CreateDayoffRequestDto, StatusDayoffRequestDto } from '@dto';
import { DayOff, User } from '@model';
import { UserService } from '@service';
import { DayoffRepository } from '@repository';
import { BaseService } from '@shared';

export const P_DAYOFF_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f61';
export const P_DAYOFF_DETAIL = 'bd11ca07-2cf4-473f-ac43-50b0eac577f3';
export const P_DAYOFF_CREATE = 'becacb61-46c5-445e-bce4-0f3a2cfed519';
export const P_DAYOFF_UPDATE = '972e4159-e3ce-416e-a526-ffd83039e09a';
export const P_DAYOFF_DELETE = 'cdece61b-f159-4dec-8b27-b7de50c9b849';
export const P_DAYOFF_UPDATE_STATUS = '3431f438-20fd-4482-b2e1-ad7f89c67eed';
export const P_DAYOFF_EXPORT_EXCEL = 'a4f0f84c-2f4d-46ed-99c9-e928b53d9d54';

export const T_DAYOFF_WITH_BALANCE = 1;
export const T_DAYOFF_WITHOUT_BALANCE = 2;
export const T_DAYOFF_REMOTE = 3;

@Injectable()
export class DayoffService extends BaseService<DayOff> {
  constructor(
    public repo: DayoffRepository,
    private readonly userService: UserService,
  ) {
    super(repo);
    this.listJoin = ['staff', 'manager', 'approvedBy'];
  }

  /**
   *
   * @param user
   * @returns User
   *
   */
  async updateStaff(user: User): Promise<User | null> {
    const i18n = I18nContext.current()!;
    if (!user.id) throw new BadRequestException(i18n.t('common.Data id not found', { args: { id: user.id } }));
    const data = await this.repo.getManyDayOffThisYearByStaffId(user.id);
    const dateOff = data.reduce((sum: number, item) => sum + item.timeNumber, 0);
    return await this.userService.update(user.id, { dateOff, startDate: user.startDate });
  }

  /**
   *
   * @param user
   * @param body
   * @returns void
   *
   */
  async checkHaveDate(user: User, body: CreateDayoffRequestDto): Promise<void> {
    const i18n = I18nContext.current()!;
    if (!user.id) throw new BadRequestException(i18n.t('common.Data id not found', { args: { id: user.id } }));
    const data = await this.repo.getCountWaitByDateLeaveAndStaffId(user.id, body.dateLeaveStart, body.dateLeaveEnd);

    if (data > 0) throw new BadRequestException(i18n.t('common.DayOff.The leave date has been registered'));
    else {
      const listDay = await this.repo.getManyWaitByDateLeaveAndStaffId(user.id, body.dateLeaveStart, body.dateLeaveEnd);
      if (
        listDay.filter(
          (item) =>
            dayjs(item.dateLeaveStart).startOf('days') <= dayjs(body.dateLeaveStart) &&
            dayjs(item.dateLeaveEnd).startOf('days') >= dayjs(body.dateLeaveEnd).startOf('days'),
        ).length > 0
      )
        throw new BadRequestException(i18n.t('common.DayOff.The leave date has been registered'));
    }
  }

  /**
   *
   * @param user
   * @param body
   * @returns DayOff
   *
   */
  async createDayOff(body: CreateDayoffRequestDto, user: User): Promise<DayOff | null> {
    const i18n = I18nContext.current()!;
    if (!user.id) throw new BadRequestException(i18n.t('common.Data id not found', { args: { id: user.id } }));
    await this.checkHaveDate(user, body);
    body.staffId = user.id;
    body.managerId = user.managerId;
    let number = 1;
    const dateLeaveStart = dayjs(body.dateLeaveStart);
    const dateLeaveEnd = dayjs(body.dateLeaveEnd);
    if (body.time === 0 && dateLeaveStart.endOf('week').toString() !== dateLeaveEnd.endOf('week').toString()) {
      number = -dayjs(body.dateLeaveEnd).endOf('week').diff(dayjs(body.dateLeaveStart).endOf('week'), 'weeks');
    }
    if (number < -1) number = number - (number + 1) + (number + 1) * 2;
    body.timeNumber = body.time === 0 ? dateLeaveEnd.diff(dateLeaveStart, 'days') + number : 0.5;
    const count = await this.repo.getCountToday();
    body.code = (parseInt(dayjs().format('YYMMDD')) * 1000000 + (count + 1)).toString();

    const data = await super.create(body);
    await this.updateStaff(user);
    return data;
  }

  /**
   *
   * @param id
   * @param user
   * @param body
   * @returns DayOff
   *
   */
  async updateStatus(id: string, body: StatusDayoffRequestDto, user: User): Promise<DayOff | null> {
    const data = await this.findOne(id, []);
    if (!data || data.managerId !== user.id) throw ForbiddenException;
    await this.update(id, { ...body, approvedById: user.id, approvedAt: new Date() });
    if (body.status === -1) await this.updateStaff(data.staff);
    return await this.findOne(id, []);
  }
}
