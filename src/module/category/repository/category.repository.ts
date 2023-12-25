import { BaseRepository } from "@shared";
import { Category } from "../model/category.model";
import { DataSource } from "typeorm";
import { async } from "rxjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryRepository extends BaseRepository<Category>{
    constructor(public readonly dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
      }
     
     async checkCategoryNameExist(name:string){
      console.log('name',name);
      
      return await this.createQueryBuilder('category')
           .select(['category.id'])
          .andWhere('category.name = :name', {
              name
          })
          .andWhere(`category.isDeleted is NULL`)
          .getOne()
     }
}