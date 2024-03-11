import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

import { CreateUserRequestDto, UpdateUserRequestDto } from '@dto';
import { User } from '@model';
import { UserRepository } from '@repository';
import { BaseService, getImages } from '@shared';
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

    const data = await super.create(body);
    if (data?.avatar) await this.fileService.activeFiles([data?.avatar]);
    await this.fileService.activeFiles(getImages<User>(['avatar'], data)[0]);
    return data;
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

    const oldData = await this.findOne(id, []);
    const data = await super.update(id, body, callBack);
    const [listFilesActive, listFilesRemove] = getImages<User>(['thumbnailUrl'], data, [], oldData);
    await this.fileService.activeFiles(listFilesActive);
    await this.fileService.removeFiles(listFilesRemove);
    return data;
  }

  /**
   *
   * @param id
   * @returns User
   *
   */
  async remove(id: string): Promise<User | null> {
    const data = await super.remove(id);
    if (data?.avatar) await this.fileService.removeFiles([data?.avatar]);
    await this.fileService.removeFiles(getImages<User>(['thumbnailUrl'], data)[0]);
    return data;
  }
}
