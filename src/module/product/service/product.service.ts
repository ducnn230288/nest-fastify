import { Product } from "@model";
import { BaseService } from "@shared";
import { DataSource } from "typeorm";
import { ProductRepository } from "../repository/product.repository";
import { Injectable } from "@nestjs/common";


export const P_PRODUCT_CREATE = "41b27fb2-9ee1-11ee-8c90-0242ac120002"

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(
       public repo : ProductRepository
    ) {
        super(repo);
        this.listJoin = [];
    }

}