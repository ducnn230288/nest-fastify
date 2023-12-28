import { BadRequestException, Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { Category } from '@model';
import { CreateCategoryWithUserRequestDto, UpdateCategoryRequestDto } from '@dto';
import { I18nContext } from 'nestjs-i18n';
import { CategoryRepository } from '@repository';

export const P_CATEGORY_CREATE = '9b0feb4a-fd07-4353-bdd0-21bcd41485eb';
export const P_CATEGORY_LISTED = '1ed5a406-df45-4057-a480-5907a55b79e0';
export const P_CATEGORY_DETAIL = '63ce89fa-20ba-4cde-a368-cc08d412b44e';
export const P_CATEGORY_UPDATE = '877d9897-a786-4b92-82ba-544bd68f459c';
export const P_CATEGORY_DELETE = '3ac1ef75-d3f5-49e9-bf21-51307a1fb448';

@Injectable()
export class CategoryService extends BaseService<Category> {
    constructor(
        public readonly repo: CategoryRepository,
    ) {
        super(repo);
        this.listJoin = ['parent'];
    }

    async create(request: CreateCategoryWithUserRequestDto): Promise<Category | null> {
        const i18n = I18nContext.current()!;
        const data = await this.repo.getCategoryByName(request.name!);
        if (data) throw new BadRequestException(i18n.t('common.Category.Name is already taken'));
        if (request.parentId) {
            await super.update(
                request.parentId!,
                { isParent: true }
            );
        }
        return super.create(request);
    }

    async update(id: string, request: UpdateCategoryRequestDto): Promise<Category | null> {
        const i18n = I18nContext.current()!;
        const data = await this.repo.getCategoryByName(request.name!);
        if (data) throw new BadRequestException(i18n.t('common.Category.Name is already taken'));

        return await super.update(id, request)
    }
}