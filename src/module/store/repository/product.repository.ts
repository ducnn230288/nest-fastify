import { BaseRepository } from "@shared";
import { Product } from '@model';
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    constructor(public readonly dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }
}