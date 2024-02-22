import { Injectable, BadRequestException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

import { BaseService } from '@shared';
import { PostType } from '@model';
import { PostRepository, PostTypeRepository } from '@repository';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { CreatePostTypeRequestDto } from '@dto';

export const P_POST_TYPE_LISTED = 'efa34c52-8c9a-444d-a82b-8bec109dbab5';
export const P_POST_TYPE_CREATE = '87cb77c4-565c-43ec-bffc-fbaf5077c2be';
export const P_POST_TYPE_UPDATE = 'bfa36cef-71c4-4f08-89e6-d7e0c1c03ba4';
export const P_POST_TYPE_DELETE = 'cd00c62e-1ec4-4c61-b273-cdd6867a3212';

/**
 * Injectable decorator to mark the class as injectable and allow DI
 */
@Injectable()
export class PostTypeService extends BaseService<PostType> {
  /**
   * Constructor for PostTypeService class
   * @param repo The PostTypeRepository instance
   * @param repoPost The PostRepository instance
   */
  constructor(
    public repo: PostTypeRepository,
    public repoPost: PostRepository,
  ) {
    super(repo);
  }

  /**
   * Asynchronously fetches the tree of post types
   * @returns A promise that resolves to an array of PostType objects representing the tree
   */
  async findTree(): Promise<PostType[]> {
    return this.repo.getTree();
  }

  /**
   * Asynchronously creates a PostType entity along with its parent-child relationship in the database.
   * @param body - The partial data of the CreatePostTypeRequestDto to create the PostType entity.
   * @returns A Promise that resolves to the created PostType entity or null if creation fails.
   */
  async createTree(body: DeepPartial<CreatePostTypeRequestDto>): Promise<PostType | null> {
    let data = await this.create(body);
    if (data && body.idChildren) {
      const parent = await this.findOne(body.idChildren, []);
      if (parent) {
        data.parent = parent;
        data = await this.repo.save(data);
      }
    }
    return data;
  }

  /**
   * Asynchronously checks if a post type can be removed and then removes it
   * @param id The id of the post type to check and remove
   * @returns A promise that resolves to the removed PostType object or null if not removed
   */
  async removeCheck(id: string): Promise<PostType | null> {
    const i18n = I18nContext.current()!;
    const data = await this.findOne(id, []);

    if (data?.code) {
      const count = await this.repoPost.getCountByCode(data.code);

      if (count > 0)
        throw new BadRequestException(i18n.t("common.User.Can't be deleted because there's still link data"));

      return await this.removeHard(id);
    }

    return null;
  }
}
