import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "@model";
import { CategoryController } from "@controller";
import { CategoryService } from "@service";


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