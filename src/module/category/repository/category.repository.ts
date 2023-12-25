import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { Category } from "@model";
import { BaseRepository } from "@shared";

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
    constructor(public readonly dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
    }

    async getCategoryByName(name: string): Promise<Category | null> {
        return await this.createQueryBuilder('base')
            .andWhere('base.name = :name', { name })
            .withDeleted()
            .getOne()
    }
}