import { Brackets, ObjectLiteral } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import dayjs from 'dayjs';
import { snakeCase } from 'typeorm/util/StringUtils';

import { PaginationQueryDto, BaseRepository } from '@shared';
import { DeepPartial } from 'typeorm/common/DeepPartial';

export abstract class BaseService<T extends ObjectLiteral> {
  public listQuery: string[] = [];
  public listJoin: string[] = [];
  public listJoinCount: { name: string; key: string }[] = [];
  public listHistoryKey = [];
  public joinColumn: string[] = [];
  public listInnerJoin: { key: string; condition: string }[] = [];
  protected constructor(
    public repo: BaseRepository<T>, // public repoHistory?: Repository<T>,
  ) {}

  /**
   * Decorator that marks a class as a [provider](https://docs.nestjs.com/providers).
   * Providers can be injected into other classes via constructor parameter injection
   * using Nest's built-in [Dependency Injection (DI)](https://docs.nestjs.com/providers#dependency-injection)
   * system.
   *
   * When injecting a provider, it must be visible within the module scope (loosely
   * speaking, the containing module) of the class it is being injected into. This
   * can be done by:
   *
   * - defining the provider in the same module scope
   * - exporting the provider from one module scope and importing that module into the
   *   module scope of the class being injected into
   * - exporting the provider from a module that is marked as global using the
   *   `@Global()` decorator
   *
   * @param paginationQuery string or object describing the error condition.
   */
  async findAll(paginationQuery: PaginationQueryDto): Promise<[T[], number]> {
    const { where, perPage, page, fullTextSearch } = paginationQuery;

    const filter =
      typeof paginationQuery.filter === 'string' ? JSON.parse(paginationQuery.filter) : paginationQuery.filter;
    const skip = typeof paginationQuery.skip === 'string' ? JSON.parse(paginationQuery.skip) : paginationQuery.skip;
    const extend =
      typeof paginationQuery.extend === 'string' ? JSON.parse(paginationQuery.extend) : paginationQuery.extend;

    const request = this.repo
      .createQueryBuilder('base')
      .orderBy('base.createdAt', 'DESC')
      .withDeleted()
      .andWhere('base.isDeleted Is Null');
    if (this.listInnerJoin.length) {
      this.listInnerJoin.forEach((innerJoin) => {
        request.innerJoin(`base.${innerJoin.key}`, innerJoin.key, `${innerJoin.key}.${innerJoin.condition}`);
      });
    }
    if (this.listJoin.length) {
      this.listJoin.forEach((key) => {
        const checkKey = key.split('.');
        request.leftJoinAndSelect(
          `${checkKey.length === 1 ? 'base.' + checkKey[0] : key}`,
          checkKey[checkKey.length - 1],
        );
      });
    }

    if (this.joinColumn.length) {
      this.joinColumn.forEach((key) => {
        const checkKey = key.split('.');
        request.leftJoin(`${checkKey.length === 1 ? 'base.' + checkKey[0] : key}`, checkKey[checkKey.length - 1]);
      });
    }

    if (where) {
      where.forEach((item) => {
        Object.keys(item).forEach((key) => {
          const checkKey = key.split('.');
          // request = request.andWhere(`base.${key}=:${key}`, { [key]: item[key] });
          request.andWhere(`${checkKey.length === 1 ? 'base.' + checkKey[0] : key}=:${key}`, {
            [key]: item[key],
          });
        });
      });
    }

    if (filter && Object.keys(filter).length) {
      request.andWhere(
        new Brackets((qb) => {
          Object.keys(filter).forEach((key) => {
            if (typeof filter[key] === 'object' && filter[key]?.length > 0) {
              if (dayjs(filter[key][0]).isValid()) {
                qb = qb.andWhere(`base."${snakeCase(key)}" BETWEEN :startDate AND :endDate`, {
                  startDate: filter[key][0],
                  endDate: filter[key][1],
                });
              } else {
                const checkKey = key.split('.');
                qb = qb.andWhere(`${checkKey.length === 1 ? 'base.' + checkKey[0] : key} IN (:...${key})`, {
                  [key]: filter[key],
                });
              }
            } else if (typeof filter[key] !== 'object') {
              // /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(filter[key])
              if (filter[key] === 'NULL') qb = qb.andWhere(`base.${key} IS NULL`);
              else qb = qb.andWhere(`base.${snakeCase(key)}=:${key}`, { [key]: filter[key] });
            }
          });

          if (skip && Object.keys(skip).length) {
            Object.keys(skip).forEach((key) => {
              if (typeof skip[key] === 'object' && skip[key].length > 0) {
                if (dayjs(skip[key][0]).isValid()) {
                  qb = qb.andWhere(`"base.${snakeCase(key)}" NOT BETWEEN :startDate AND :endDate`, {
                    startDate: skip[key][0],
                    endDate: skip[key][1],
                  });
                } else {
                  const checkKey = key.split('.');
                  qb = qb.andWhere(
                    `${checkKey.length === 1 ? 'base.' + snakeCase(checkKey[0]) : key} IN (:...${key})`,
                    {
                      [key]: skip[key],
                    },
                  );
                }
              } else if (typeof skip[key] !== 'object') {
                // /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(skip[[key])
                qb = qb.andWhere(`base.${snakeCase(key)}!=:${key}`, { [key]: skip[key] });
              }
            });
          }
        }),
      );
    }
    if (fullTextSearch && this.listQuery.length) {
      request.andWhere(
        new Brackets((qb) => {
          this.listQuery.forEach((key) => {
            if (!filter || !filter[key]) {
              qb = qb.orWhere(`base.${snakeCase(key)} like :${key}`, {
                [key]: `%${fullTextSearch}%`,
              });
            }
          });
        }),
      );
    }

    if (this.listJoinCount.length) {
      this.listJoinCount.forEach((item) => {
        request.loadRelationCountAndMap('base.' + item.name, 'base.' + item.key);
      });
    }

    let { sorts } = paginationQuery;
    if (typeof sorts === 'string') sorts = JSON.parse(sorts);
    if (sorts && Object.keys(sorts).length) {
      Object.keys(sorts).forEach((key) => {
        const checkKey = key.split('.');
        request.orderBy(`${checkKey.length === 1 ? 'base.' + checkKey[0] : key}`, sorts![key]);
      });
    }
    request.take(perPage || 10).skip((page !== undefined ? page - 1 : 0) * (perPage || 10));

    const res: [T[], number] = await request.getManyAndCount();

    if (extend && Object.keys(extend).length) {
      let isGet = false;
      const request = this.repo.createQueryBuilder('base').andWhere(
        new Brackets((qb) => {
          Object.keys(extend).forEach((key) => {
            if (typeof extend[key] === 'object' && extend[key].length > 0) {
              isGet = true;
              if (dayjs(extend[key][0]).isValid()) {
                qb = qb.andWhere(`"${key}" BETWEEN :startDate AND :endDate`, {
                  startDate: extend[key][0],
                  endDate: extend[key][1],
                });
              } else {
                const checkKey = key.split('.');
                qb = qb.andWhere(`${checkKey.length === 1 ? 'base.' + checkKey[0] : key} IN (:...${key})`, {
                  [key]: extend[key],
                });
              }
            } else if (typeof extend[key] !== 'object') {
              isGet = true;
              // /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(extend[key])
              qb = qb.andWhere(`base.${key}=:${key}`, { [key]: extend[key] });
            }
          });
        }),
      );
      if (isGet) {
        const data = await request.getMany();
        const ids = new Set(res[0].map((d) => d.id));
        res[0] = res[0].concat(data.filter((item) => !ids.has(item['id'])));
        res[1] = res[0].length;
      }
    }
    return [res[0], res[1]];
  }

  async findOne(id: string, listJoin: string[] = []): Promise<T | null> {
    const i18n = I18nContext.current()!;
    if (!id) throw new BadRequestException(i18n.t('common.Data id not found', { args: { id } }));
    const request = this.repo.createQueryBuilder('base');
    if (this.listJoin.length) {
      this.listJoin.forEach((key) => {
        const checkKey = key.split('.');
        request.leftJoinAndSelect(
          `${checkKey.length === 1 ? 'base.' + checkKey[0] : key}`,
          checkKey[checkKey.length - 1],
        );
      });
    }
    if (listJoin.length) {
      listJoin.forEach((key) => {
        const checkKey = key.split('.');
        request.leftJoinAndSelect(
          `${checkKey.length === 1 ? 'base.' + checkKey[0] : key}`,
          checkKey[checkKey.length - 1],
        );
      });
    }

    const data = await request.where('base.id=:id', { id }).withDeleted().getOne();
    if (!data) throw new BadRequestException(i18n.t('common.Data id not found', { args: { id } }));
    return data;
  }

  async create(body: DeepPartial<T>): Promise<T | null> {
    const data = this.repo.create({ ...body });
    return this.repo.save(data);
  }

  async update(id: string, body: DeepPartial<T>, callBack?: (data: T) => Promise<T>): Promise<T | null> {
    const i18n = I18nContext.current()!;
    let data = await this.repo.preload({
      id,
      ...body,
    });
    if (!data) {
      throw new BadRequestException(i18n.t('common.Data id not found', { args: { id } }));
    }
    if (callBack) data = await callBack(data);
    return this.repo.save(data);
  }

  async remove(id: string): Promise<T | null> {
    const i18n = I18nContext.current()!;
    const res = await this.repo.softDelete(id);
    if (!res.affected) {
      throw new BadRequestException(i18n.t('common.Data id not found', { args: { id } }));
    }
    return await this.findOne(id, []);
  }

  async removeHard(id: string): Promise<T | null> {
    const data = await this.findOne(id, []);
    const res = await this.repo.delete(id);
    if (!res.affected) {
      const i18n = I18nContext.current()!;
      throw new BadRequestException(i18n.t('common.Data id not found', { args: { id } }));
    }
    return data;
  }

  // async history(newData: any, status = 'UPDATED') {
  //   const originalID = newData.id;
  //   if (status === 'UPDATED') {
  //     const oldData = await this.repoHistory
  //       .createQueryBuilder('base')
  //       .where('base.originalID = :originalID', { originalID })
  //       .orderBy('base.createdAt', 'DESC')
  //       .getOne();
  //     if (oldData) {
  //       let checkDifferent = false;
  //       this.listHistoryKey.forEach((key: string) => {
  //         if (!checkDifferent && newData[key]?.toString() != oldData[key]?.toString()) {
  //           checkDifferent = true;
  //         }
  //       });
  //       if (!checkDifferent) {
  //         return false;
  //       }
  //     }
  //   }
  //
  //   delete newData.id;
  //   delete newData.createdAt;
  //   const data = this.repoHistory.create({ ...newData, originalID, action: status });
  //   await this.repoHistory.save(data);
  // }
}
