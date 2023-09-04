import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { File } from '@model';
import { DataSource } from 'typeorm';

@Injectable()
export class FileRepository extends BaseRepository<File> {
  constructor(public readonly dataSource: DataSource) {
    super(File, dataSource.createEntityManager());
  }

  /**
   *
   * @param url
   * @returns Parameter
   *
   */
  async getDataByUrl(url: string): Promise<File | null> {
    return await this.createQueryBuilder('base').where('base.url=:url', { url }).withDeleted().getOne();
  }
}
