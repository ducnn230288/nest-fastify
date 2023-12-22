import { BaseRepository } from "@shared";
import { Category } from "../model/category.model";
import { DataSource } from "typeorm";


export class CategoryRepository extends BaseRepository<Category>{
    constructor(public readonly dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
      }
     
     
}