import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Category } from "../model/category.model";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "@shared";
import { DataSource, EntityManager, Repository } from "typeorm";
import { CreateCategoryRequestDto } from "../dto";
import { User } from "@model";
import { isNullOrUndefined } from "util";

@Injectable()
export class CategoryService extends BaseService<Category> {
    constructor(
        @InjectRepository(Category)
        public repo: Repository<Category>,
        public datasource: DataSource
    ) {
        super(repo);
    }

    async addCategory(
        categoryDto: CreateCategoryRequestDto,
    ) {
        console.log(categoryDto);

        const { name, parentId } = categoryDto
        if (!isNullOrUndefined(name)) {
            if (name == '') {
                throw new InternalServerErrorException(
                    'Tên danh mục không được để trống'
                );
            }
        }
        //   const query = await this.repo.createQueryBuilder('category');
        //     query
        //         .select(['category.id'])
        //         .where(' category.name = :name)', {
        //            name
        //         })
        //         .andWhere(`category.isDeleted = false`)
        //        // .andWhere(`category.orgId = ${user.orgId}`);  
        //        if (!isNullOrUndefined(parentId)) {
        //         query.andWhere(`category.parentId = ${parentId}`);
        //     } else query.andWhere(`category.parentId is NULL`);
        //     const data = await query.getOne();
        //     if (!isNullOrUndefined(data)) {
        //         throw new InternalServerErrorException(
        //             'Tên danh mục này đã tồn tại'
        //         );
        //     }
        let parentCategory;
        if (!isNullOrUndefined(parentId)) {
            parentCategory = await this.repo
                .createQueryBuilder('category')
                .select(['category'])
                .where(`category.id = ${parentId}`)
                .getOne();
            if (isNullOrUndefined(parentCategory)) {
                throw new InternalServerErrorException(
                    'Danh mục sản phẩm không tồn tại trong hệ thống.'
                );
            }
            // await transactionManager.update(
            //     Category,
            //     {
            //         id: parentId
            //     },
            //     {
            //         isParent: true
            //     }
            // );
            const data = await this.datasource.transaction(async (entityManager) => {

                await entityManager.save(
                    entityManager.create(Category, {
                        name,
                        parentId: parentId,
                        isDeleted: false,
                        isActive: true,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        isKiotViet: false
                    }))
            })
            console.log('vo');
            
            console.log(data);
            
            return data;
        }
    }
}