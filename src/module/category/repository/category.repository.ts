import { BaseRepository } from "@shared";
import { Category } from "../model/category.model";
import { DataSource } from "typeorm";
import { isNullOrUndefined } from 'util';


export class CategoryRepository extends BaseRepository<Category> {
  constructor(public readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async checkExitsName(name: string): Promise<Boolean> {

    const query = await this.createQueryBuilder('category');
    query
      .select(['category.id'])
      .where(' category.name = :name', {
        name
      })
      .andWhere(`category.isDeleted is NULL`).getOne();
    return !!query
  }

}