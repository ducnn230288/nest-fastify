import { Injectable } from '@nestjs/common';

import { CreatePostRequestDto, UpdatePostRequestDto } from '@dto';
import { Post } from '@model';
import { PostRepository, PostTranslationRepository } from '@repository';
import { BaseService, getImages } from '@shared';
import { FileService } from './file.service';

export const P_POST_LISTED = '7c34dc92-cbbe-4419-8dbc-745818d76098';
export const P_POST_CREATE = '0ca9634c-3496-4059-bf86-5bec23c96b55';
export const P_POST_UPDATE = 'eda2799a-4072-46a7-9a26-efa9a98036db';
export const P_POST_DELETE = '4097d5ff-e35c-4bff-a5b1-013ca1181762';

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(
    public repo: PostRepository,
    public repoTranslation: PostTranslationRepository,
    public fileService: FileService,
  ) {
    super(repo);
    this.listJoin = ['translations'];
  }

  /**
   *
   * @param types
   * @returns { [p]: Post[] }
   *
   */
  async findArrayCode(types: string[]): Promise<{ [p: string]: Post[] }> {
    const tempData: { [key: string]: Post[] } = {};
    for (const type of types) {
      tempData[type] = (await this.findAll({ filter: '{"isDisabled":"NULL"}', sorts: '{"createdAt":"DESC"}' }))[0];
    }
    return tempData;
  }

  /**
   *
   * @param slug
   * @returns Post
   *
   */
  async findSlug(slug: string): Promise<Post | null> {
    const postTranslation = await this.repoTranslation.getDataBySlug(slug);
    if (postTranslation?.postId) return this.findOne(postTranslation.postId, []);
    return null;
  }

  /**
   *
   * @param body
   * @returns Post
   *
   */
  async create(body: CreatePostRequestDto): Promise<Post | null> {
    const data = await this.repo.createWithTranslation(body);
    await this.fileService.activeFiles(getImages<Post>(['thumbnailUrl'], data, ['translations'])[0]);
    return data;
  }

  /**
   *
   * @param id
   * @param body
   * @returns Post
   *
   */
  async update(id: string, body: UpdatePostRequestDto): Promise<Post | null> {
    const oldData = await this.findOne(id, []);
    const data = await this.repo.updateWithTranslation(id, body);
    const [listFilesActive, listFilesRemove] = getImages<Post>(['thumbnailUrl'], data, ['translations'], oldData);
    await this.fileService.activeFiles(listFilesActive);
    await this.fileService.removeFiles(listFilesRemove);

    return data;
  }

  /**
   *
   * @param id
   * @returns Post
   *
   */
  async removeHard(id: string): Promise<Post | null> {
    const data = await super.removeHard(id);
    await this.fileService.removeFiles(getImages<Post>(['thumbnailUrl'], data, ['translations'])[0]);
    return data;
  }
}
