import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { Data, DataTranslation } from '@model';
import { CreateDataRequestDto, UpdateDataRequestDto } from '@dto';

@Injectable()
export class DataRepository extends BaseRepository<Data> {
  constructor(private readonly dataSource: DataSource) {
    super(Data, dataSource.createEntityManager());
  }

  /**
   *
   * @param translations
   * @param body
   * @returns Data
   *
   */
  async createWithTranslation({ translations, ...body }: CreateDataRequestDto): Promise<Data | null> {
    const i18n = I18nContext.current()!;
    let result: Data | null = null;
    await this.dataSource.transaction(async (entityManager) => {
      result = await entityManager.save(entityManager.create(Data, { ...body }));
      if (translations) {
        result.translations = [];
        for (const item of translations) {
          delete item.id;
          const existingName = await entityManager
            .createQueryBuilder(DataTranslation, 'base')
            .andWhere(`base.name=:name`, { name: item.name })
            .andWhere(`base.language=:language`, { language: item.language })
            .withDeleted()
            .getCount();
          if (existingName) {
            throw new BadRequestException(i18n.t('common.Data.Name is already taken'));
          }
          const data = await entityManager.save(entityManager.create(DataTranslation, { dataId: result.id, ...item }));
          if (data) result.translations.push(data);
        }
      }
    });
    return result;
  }

  /**
   *
   * @param id
   * @param translations
   * @param body
   * @returns Data
   *
   */
  async updateWithTranslation(id: string, { translations, ...body }: UpdateDataRequestDto): Promise<Data | null> {
    const i18n = I18nContext.current()!;
    let result: Data | null = null;
    await this.dataSource.transaction(async (entityManager) => {
      const data = await entityManager.preload(Data, {
        id,
        ...body,
      });
      if (!data) {
        throw new BadRequestException(i18n.t('common.Data id not found', { args: { id } }));
      }
      result = await this.save(data);
      if (translations) {
        result.translations = [];
        for (const item of translations) {
          const existingName = await entityManager
            .createQueryBuilder(DataTranslation, 'base')
            .andWhere(`base.name=:name`, { name: item.name })
            .andWhere(`base.language=:language`, { language: item.language })
            .andWhere(`base.dataId != :dataId`, { dataId: id })
            .withDeleted()
            .getCount();
          if (existingName) {
            throw new BadRequestException(i18n.t('common.Data.Name is already taken'));
          }
          const data = await entityManager.save(
            await entityManager.preload(DataTranslation, { dataId: result.id, ...item }),
          );
          if (data) result.translations.push(data);
        }
      }
    });
    return result;
  }
}
