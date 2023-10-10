import { Injectable, BadRequestException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

import { BaseService } from '@shared';
import { PostType } from '@model';
import { PostRepository, PostTypeRepository } from '@repository';

export const P_POST_TYPE_LISTED = 'efa34c52-8c9a-444d-a82b-8bec109dbab5';
export const P_POST_TYPE_CREATE = '87cb77c4-565c-43ec-bffc-fbaf5077c2be';
export const P_POST_TYPE_UPDATE = 'bfa36cef-71c4-4f08-89e6-d7e0c1c03ba4';
export const P_POST_TYPE_DELETE = 'cd00c62e-1ec4-4c61-b273-cdd6867a3212';

@Injectable()
export class PostTypeService extends BaseService<PostType> {
  constructor(
    public repo: PostTypeRepository,
    public repoPost: PostRepository,
  ) {
    super(repo);
  }

  /**
   *
   * @returns PostType[]
   *
   */
  async findTree(): Promise<PostType[]> {
    return this.repo.getTree();
  }

  /**
   *
   * @param id
   * @returns PostType
   *
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
