import { BadRequestException, Injectable, StreamableFile } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import dayjs from 'dayjs';
import { parse } from 'json2csv';
import { Readable } from 'stream';

import { CreateUserRequestDto, UpdateUserRequestDto } from '@dto';
import { User } from '@model';
import { DayoffRepository, UserRepository, UserTeamRepository } from '@repository';
import { BaseService, getImages } from '@shared';
import { FileService, T_DAYOFF_REMOTE, T_DAYOFF_WITHOUT_BALANCE } from '@service';

export const P_USER_LISTED = 'ac0c4f13-776d-4b71-be4d-f9952734a319';
export const P_USER_DETAIL = 'a9de3f3d-4c04-4f50-9d1b-c3c2e2eca6dc';
export const P_USER_CREATE = '41c9d4e1-ba5a-4850-ad52-35ac928a61d9';
export const P_USER_UPDATE = 'bc0b5f32-ddf7-4c61-b435-384fc5ac7574';
export const P_USER_DELETE = 'b82e6224-12c3-4e6c-b4e0-62495fb799bf';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    public readonly repo: UserRepository,
    public readonly fileService: FileService,
    public repoDayOff: DayoffRepository,
    public repoUserTeam: UserTeamRepository,
  ) {
    super(repo);
    this.listQuery = ['name', 'email', 'phoneNumber'];
    this.listJoin = ['role', 'position', 'address'];
  }

  /**
   *
   * @param body
   * @returns User
   *
   */
  async create(body: CreateUserRequestDto): Promise<User | null> {
    const i18n = I18nContext.current()!;
    if (body.password !== body.retypedPassword)
      throw new BadRequestException(i18n.t('common.Auth.Passwords are not identical'));

    const existingUser = await this.repo.getDataByEmail(body.email!);
    if (existingUser) throw new BadRequestException(i18n.t('common.Auth.Email is already taken'));

    const existingPhoneNumber = await this.repo.getDataByPhoneNumber(body.phoneNumber!);
    if (existingPhoneNumber) throw new BadRequestException(i18n.t('common.Auth.Phone number is already taken'));

    body.dateLeave = this.getTotalDate(body.startDate!);
    if (body.teamsId && body.teamsId.length > 0) {
      body.teams = await this.repoUserTeam.getManyByArrayId(body.teamsId);
    }
    const data = await super.create(body);
    if (data?.avatar) await this.fileService.activeFiles([data?.avatar]);
    await this.fileService.activeFiles(getImages<User>(['avatar'], data)[0]);
    return data;
  }

  /**
   *
   * @param startDate
   * @returns number
   *
   */
  getTotalDate(startDate: Date): number {
    const now = dayjs();
    const time = now.diff(now.startOf('year'), 'months');
    let dateLeave;
    if (now.month() > 2) {
      dateLeave = time;
    } else {
      if (dayjs(startDate).year() == now.year()) {
        dateLeave = dayjs(startDate).startOf('year').diff(startDate, 'months') + time;
      } else if (dayjs(startDate).year() == now.year() - 1) {
        dateLeave = now.diff(startDate, 'months');
      } else {
        dateLeave = 12 + time;
      }
    }
    return dateLeave;
  }

  /**
   *
   * @returns null
   *
   */
  async updateAllDaysOff(dateLeave?: string): Promise<null> {
    const data = await this.repo.createQueryBuilder('base').getMany();
    data.forEach((item) =>
      this.update(item.id!, {
        ...item,
        dateLeave: dateLeave !== undefined ? parseInt(dateLeave) : (item.dateLeave || 0) + 1,
      }),
    );
    return null;
  }

  /**
   *
   * @param id
   * @param body
   * @param callBack
   * @returns User
   *
   */
  async update(
    id: string,
    body: UpdateUserRequestDto | { isDisabled?: Date | null },
    callBack?: (data: User) => Promise<User>,
  ): Promise<User | null> {
    const i18n = I18nContext.current()!;

    if (body instanceof UpdateUserRequestDto && body?.email) {
      const existingUser = await this.repo.getDataByEmail(body.email, id);
      if (existingUser) throw new BadRequestException(i18n.t('common.Auth.Email is already taken'));
    }

    if (body instanceof UpdateUserRequestDto && body?.phoneNumber) {
      const existingPhoneNumber = await this.repo.getDataByPhoneNumber(body.phoneNumber, id);
      if (existingPhoneNumber) throw new BadRequestException(i18n.t('common.Auth.Phone number is already taken'));
    }

    let oldData: User | null = null;
    if (id && body instanceof UpdateUserRequestDto) {
      oldData = await this.findOne(id, []);
      if (body.managerId) {
        const user = await this.findOne(id, []);
        if (user?.managerId && body.managerId != user.managerId) {
          const countDayOff = await this.repoDayOff.getCountWaitByStaffId(id);
          if (countDayOff > 0) {
            throw new BadRequestException(i18n.t('common.User.Other leave requests need approval'));
          }
        }
      }
      if (body.teamsId && body.teamsId.length > 0) {
        body.teams = await this.repoUserTeam.getManyByArrayId(body.teamsId);
      }
    }

    const data = await super.update(id, body, callBack);
    if (id) {
      const [listFilesActive, listFilesRemove] = getImages<User>(['thumbnailUrl'], data, [], oldData);
      await this.fileService.activeFiles(listFilesActive);
      await this.fileService.removeFiles(listFilesRemove);
    }

    return data;
  }

  /**
   *
   * @param id
   * @returns User
   *
   */
  async remove(id: string): Promise<User | null> {
    const data = await this.findOne(id, []);

    if (data) {
      const i18n = I18nContext.current()!;
      if (data.roleCode === 'manager') {
        const count = await this.repo.getCountByManagerId(data.id!);
        if (count > 0) throw new BadRequestException(i18n.t('common.User.Still managing other people'));
      }
      if (data.managerId) {
        const countDayOff = await this.repoDayOff.getCountWaitByManagerId(data.managerId);
        if (countDayOff > 0) throw new BadRequestException(i18n.t('common.User.Other leave requests need approval'));
      }

      const res = await this.repo.softDelete(id);
      if (!res.affected) throw new BadRequestException(id);
      if (data?.avatar) await this.fileService.removeFiles([data?.avatar]);
      await this.fileService.removeFiles(getImages<User>(['thumbnailUrl'], data)[0]);

      const teams = await this.repoUserTeam.getCountByManagerId(data.id!);
      for (const item of teams) {
        item.managerId = undefined;
        await this.repoUserTeam.save(item);
      }
    }

    return data;
  }

  /**
   *
   * @returns DayOff
   *
   */
  async exportExcel(): Promise<StreamableFile> {
    const data = await this.repo.createQueryBuilder('base').getMany();
    const dataCSV = await Promise.all(
      data.map(async (item) => {
        return {
          'Họ và Tên': item?.name?.toString(),
          ID: item?.id,
          Nhóm: item?.teams?.map((item) => item.name).join(', '),
          'Ngày nghỉ còn': item.dateOff,
          'Ngày đã nghỉ': await this.repoDayOff.getCountWaitByStaffId(item.id!),
          'Ngày remote': await this.repoDayOff.getCountWaitByStaffIdWithType(item!.id!, T_DAYOFF_REMOTE),
          'Ngày remote tháng': (await this.repoDayOff.getManyDayOffThisMonthByStaffId(item!.id!, T_DAYOFF_REMOTE))
            ?.length,
          'Ngày remote năm': (await this.repoDayOff.getManyDayOffThisYearByStaffId(item!.id!, T_DAYOFF_REMOTE))?.length,
          'Ngày nghỉ không lương': await this.repoDayOff.getCountWaitByStaffIdWithType(
            item!.id!,
            T_DAYOFF_WITHOUT_BALANCE,
          ),
        };
      }),
    );

    const csvString = await parse(dataCSV);
    const fileStream = new Readable();
    fileStream.push(Buffer.from('EFBBBF', 'hex'));
    fileStream.push(csvString);
    fileStream.push(null);

    return new StreamableFile(fileStream);
  }
}
