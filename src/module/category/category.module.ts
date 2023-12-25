import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "@model";
import { CategoryController } from "@controller";
import { CategoryService } from "@service";
import { CategoryRepository } from "./repository/category.repository";


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
        CategoryService,
        CategoryRepository
    ],
    exports: [
        CategoryService,
        CategoryRepository],
})

export class CategoryModule { }