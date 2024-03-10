import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { I18nContext } from 'nestjs-i18n';

import { Post, PostTranslation } from '@model';
import { CreatePostRequestDto, UpdatePostRequestDto } from '@dto';
import { BaseRepository } from '@shared';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(private readonly dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  /**
   *
   * @param code
   * @returns number
   *
   */
  async getCountByCode(code: string): Promise<number> {
    return await this.createQueryBuilder('base').where(`base.type=:code`, { code }).withDeleted().getCount();
  }

  /**
   *
   * @param code
   * @returns Post
   *
   */
  async createWithTranslation({ translations, ...body }: CreatePostRequestDto): Promise<Post | null> {
    let result: Post | null = null;
    await this.dataSource.transaction(async (entityManager) => {
      const i18n = I18nContext.current()!;
      result = await entityManager.save(entityManager.create(Post, { ...body }));
      if (translations) {
        result.translations = [];
        for (const item of translations) {
          delete item.id;
          const existingName = await entityManager
            .createQueryBuilder(PostTranslation, 'base')
            .andWhere(`base.name=:name`, { name: item.name })
            .andWhere(`base.language=:language`, { language: item.language })
            .withDeleted()
            .getCount();
          if (existingName) throw new BadRequestException(i18n.t('common.Data.Name is already taken'));

          const data = await entityManager.save(entityManager.create(PostTranslation, { postId: result.id, ...item }));
          if (data) result.translations.push(data);
        }
      }
    });
    return result;
  }

  /**
   *
   * @param code
   * @param id
   * @returns Post
   *
   */
  async updateWithTranslation(id: string, { translations, ...body }: UpdatePostRequestDto): Promise<Post | null> {
    const i18n = I18nContext.current()!;
    let result: Post | null = null;
    await this.dataSource.transaction(async (entityManager) => {
      const data = await entityManager.preload(Post, {
        id,
        ...body,
      });
      if (!data) {
        throw new BadRequestException(i18n.t('common.Data id not found', { args: { id } }));
      }
      if (!data.createdAt) {
        throw new BadRequestException(i18n.t('common.Data id not found', { args: { id } }));
      }
      result = await this.save(data);
      if (translations) {
        result.translations = [];
        for (const item of translations) {
          const existingName = await entityManager
            .createQueryBuilder(PostTranslation, 'base')
            .andWhere(`base.name=:name`, { name: item.name })
            .andWhere(`base.language=:language`, { language: item.language })
            .andWhere(`base.postId != :postId`, { postId: id })
            .withDeleted()
            .getCount();
          if (existingName) throw new BadRequestException(i18n.t('common.Data.Name is already taken'));

          const data = await entityManager.save(
            await entityManager.preload(PostTranslation, { postId: result.id, ...item }),
          );
          if (data) result.translations.push(data);
        }
      }
    });
    return result;
  }
}
