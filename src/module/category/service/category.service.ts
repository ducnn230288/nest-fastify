import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Category } from "../model/category.model";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@shared";
import { DataSource, EntityManager, Repository } from "typeorm";
import { CreateCategoryRequestDto, UpdateCategoryRequestDto } from "@dto";
import { User } from "@model";
import { isNullOrUndefined } from "util";
import { CategoryRepository } from "@repository";
import { I18nContext } from "nestjs-i18n";

export const P_CATEGORY_CREATE ="41b27fb2-9ee1-11ee-8c90-0242ac120002"
export const P_CATEGORY_UPDATE ="86c17c16-95b0-47a5-8808-63f918319a9f"
export const P_CATEGORY_DELETE ="add04c53-8e23-4ddf-a60e-5e0631cbbb48"
export const P_CATEGORY_FINDONE ="d4f1c597-bc63-4eeb-9be2-0f1b2db5972a"
export const P_CATEGORY_FINDALL ="c2be2af0-0ef6-4faf-9d9c-b2f2b4c42a51"

@Injectable()
export class CategoryService extends BaseService<Category> {
    constructor(
        @InjectRepository(Category)
        public repo: CategoryRepository,
        public datasource: DataSource
    ) {
        super(repo);
    }

    async addCategory(
        categoryDto: CreateCategoryRequestDto,
        user: User
    ) {
        const { name, parentId } = categoryDto
        if (!isNullOrUndefined(name)) {
            if (name == '') {
                throw new InternalServerErrorException(
                    'Tên danh mục không được để trống'
                );
            }
        }
        const query = await this.repo.createQueryBuilder('category');
        query
            .select(['category.id'])
            .where(' category.name = :name', {
                name
            })
            .andWhere(`category.isDeleted is NULL`)
        //.andWhere(`category.orgId = ${user.orgId}`);  
        //    if (!isNullOrUndefined(parentId)) {
        //     query.andWhere(`category.parentId = ${parentId}`);
        // } else query.andWhere(`category.parentId is NULL`);
        const dataName = await query.getOne();
        if (!isNullOrUndefined(dataName)) {
            throw new InternalServerErrorException(
                'Tên danh mục này đã tồn tại'
            );
        }
        let parentCategory;
        if (!isNullOrUndefined(parentId)) {
            parentCategory = await this.repo
                .createQueryBuilder('category')
                .select(['category'])
                .where(`category.id ='${parentId}'`)
                .getOne();
            if (isNullOrUndefined(parentCategory)) {
                throw new InternalServerErrorException(
                    'Danh mục sản phẩm không tồn tại trong hệ thống.'
                );
            }
        }

        return await this.repo.save(
            this.repo.create({
                name: name,
                parentId: parentId,
                isParent: parentId ? true : false,
                createdById: user?.id,
                orgId: user?.orgId,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                isKiotViet: false
            }))
    }
    // async getOne(id: String, user: User) {
    //     const i18n = I18nContext.current()!;
    //     try {
    //         const category = this.repo.createQueryBuilder('category')
    //             .select('category')
    //             .where('category.id=:id', { id })
    //             .andWhere('category.isDeleted is NULL')
    //             .getOne()

    //         if (isNullOrUndefined(category)) {
    //             throw new BadRequestException(i18n.t(`common.Category.Not found`, { args: { id } }))
    //         }
    //         return category
    //     } catch (error) {
    //         throw new BadRequestException(i18n.t(`common.Category.Not found`, { args: { id } }))
    //     }
    // }
    
    
    // async updateOne(
    //     id: String,
    //     user: User,
    //     updateCategory: UpdateCategoryRequestDto
    // ) {
    //     const i18n = I18nContext.current()!;
    //     const { name } = updateCategory
    //     const query = await this.repo.createQueryBuilder('category')
    //         .select(['category'])
    //         .where('category.id  = :id', { id });

    //     const data = await query.getOne();
    //     if (isNullOrUndefined(data)) {
    //         throw new BadRequestException(i18n.t(`common.Category.Not found`, { args: { id } }))
    //     }
    //     const category = await this.repo
    //         .createQueryBuilder('category')
    //         .select(['category'])
    //         .where(`category.name = '${name}'`)
    //         .andWhere(`category.id <> '${id}'`)
    //        // .andWhere(`category.orgId = ${user.orgId}`);
    //     // if (!isNullOrUndefined(data.parentId)) {
    //     //     category.andWhere(`category.parentId = ${data.parentId}`);
    //     // }
    //     const subCategory = await category.getOne();
    //     if (!isNullOrUndefined(subCategory)) {
    //         throw new InternalServerErrorException(
    //             'Tên danh mục này đã tồn tại'
    //         );
    //     }
    //     return this.repo.save({...data,
    //                             name:name,
    //                             updatedAt:new Date()
    //                                     })          
    // }
    // async deleteOne(
    //    id: string,
    //    user : User
    // ){
    //     const i18n = I18nContext.current()!;
    //     const query = await this.repo.createQueryBuilder('category')
    //         .select(['category'])
    //         .where('category.id  = :id', { id });

    //     const data = await query.getOne();
    //     if (isNullOrUndefined(data)) {
    //         throw new BadRequestException(i18n.t(`common.Category.Not found`, { args: { id } }))
    //     }
    //     return this.repo.save({
    //         ...data,
    //         isDeleted:new Date()
    //     })
    // }
   
}

