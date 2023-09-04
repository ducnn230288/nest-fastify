import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

import { CreateUserRequestDto } from '@dto';
import { User } from '@model';
import { UserRepository } from '@repository';
import { BaseService } from '@shared';
import { FileService } from '@service';

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
  ) {
    super(repo);
    this.listQuery = ['name', 'email', 'phoneNumber'];
    this.listJoin = ['role', 'position'];
  }

  /**
   *
   * @param body
   * @param i18n
   * @returns User
   *
   */
  async create(body: CreateUserRequestDto, i18n: I18nContext): Promise<User | null> {
    if (body.password !== body.retypedPassword)
      throw new BadRequestException(i18n.t('common.Auth.Passwords are not identical'));

    const existingUser = await this.repo.getDataByEmail(body.email);

    if (existingUser) throw new BadRequestException(i18n.t('common.Auth.Email is already taken'));
    const data = await super.create(body, i18n);
    if (data?.avatar) await this.fileService.activeFiles([data?.avatar], i18n);
    return data;
  }

  async update(id: string, body: any, i18n: I18nContext, callBack?: (data: User) => User): Promise<User | null> {
    const oldData = await this.findOne(id, [], i18n);
    const data = await super.update(id, body, i18n, callBack);
    if (oldData?.avatar !== data?.avatar) {
      if (!oldData?.avatar && !!data?.avatar) await this.fileService.activeFiles([data.avatar], i18n);
      else if (!!oldData?.avatar && !data?.avatar) await this.fileService.removeFiles([oldData.avatar], i18n);
      else if (oldData?.avatar && data?.avatar) {
        await this.fileService.removeFiles([oldData.avatar], i18n);
        await this.fileService.activeFiles([data.avatar], i18n);
      }
    }
    return data;
  }

  async remove(id: string, i18n: I18nContext): Promise<User | null> {
    const data = await super.remove(id, i18n);
    if (data?.avatar) await this.fileService.removeFiles([data?.avatar], i18n);
    return data;
  }
}
