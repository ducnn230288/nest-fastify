import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared";
import { Product } from "../model/product.model";
import { DataSource } from "typeorm";

@Injectable()
export class ProductRepository extends BaseRepository<Product> {

    constructor(private readonly dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }
}