import { Module } from "@nestjs/common";
import { Category } from "./model/category.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryService } from "./service/category.service";
import { CategoryController } from "./controller/category.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Category
        ]),
    ],
    controllers: [
       CategoryController
    ],
    providers: [
       CategoryService
    ],
    exports: [],
})

export class CategoryModule { }