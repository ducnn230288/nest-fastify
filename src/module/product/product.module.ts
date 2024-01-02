import { Module } from "@nestjs/common";



@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})

export class ProductModule { }