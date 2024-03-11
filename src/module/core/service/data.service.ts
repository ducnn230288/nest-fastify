import { Injectable } from '@nestjs/common';

import { CreateDataRequestDto, UpdateDataRequestDto } from '@dto';
import { Data } from '@model';
import { DataRepository } from '@repository';
import { BaseService, getImages } from '@shared';
import { FileService } from './file.service';

export const P_DATA_LISTED = '1db70aa0-7541-4433-b2f6-fbd7bf8bf7bb';
export const P_DATA_CREATE = 'c3ab9e11-7ba3-4afd-b5cb-c560362a3144';
export const P_DATA_UPDATE = '99ea12da-5800-4d6d-9e73-60c016a267a9';
export const P_DATA_DELETE = '2e8c8772-2505-4683-b6fa-13fa2570eee7';

@Injectable()
export class DataService extends BaseService<Data> {
  constructor(
    public repo: DataRepository,
    public fileService: FileService,
  ) {
    super(repo);
    this.listJoin = ['translations'];
    this.listQuery = ['name'];
  }

  /**
   *
   * @param types
   * @returns { [p]: Data[] }
   *
   */
  async findArrayCode(types: string[]): Promise<{ [p: string]: Data[] }> {
    const tempData: { [key: string]: Data[] } = {};
    for (const type of types) {
      tempData[type] = (await this.findAll({ filter: '{"isDisabled":"NULL"}', sorts: '{"createdAt":"DESC"}' }))[0];
    }
    return tempData;
  }

  /**
   *
   * @param body
   * @returns Data
   *
   */
  async create(body: CreateDataRequestDto): Promise<Data | null> {
    const data = await this.repo.createWithTranslation(body);
    await this.fileService.activeFiles(getImages<Data>(['image'], data, ['translations'])[0]);
    return data;
  }

  /**
   *
   * @param id
   * @param body
   * @returns Data
   *
   */
  async update(id: string, body: UpdateDataRequestDto): Promise<Data | null> {
    const oldData = await this.findOne(id, []);
    const data = await this.repo.updateWithTranslation(id, body);
    const [listFilesActive, listFilesRemove] = getImages<Data>(['image'], data, ['translations'], oldData);
    await this.fileService.activeFiles(listFilesActive);
    await this.fileService.removeFiles(listFilesRemove);
    return data;
  }

  /**
   *
   * @param id
   * @returns Data
   *
   */
  async removeHard(id: string): Promise<Data | null> {
    const data = await super.removeHard(id);
    await this.fileService.removeFiles(getImages<Data>(['image'], data, ['translations'])[0]);
    return data;
  }
}
