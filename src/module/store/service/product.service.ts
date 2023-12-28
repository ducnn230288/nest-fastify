import { BaseService } from "@shared";
import { Product } from '@model';
import { ProductRepository } from "@repository";
import { Injectable } from "@nestjs/common";

export const P_PRODUCT_LISTED = "9cc05842-5bb1-4abb-927f-9ee9bdd76ecd";
export const P_PRODUCT_DETAIL = "4f36675a-1464-4166-be39-eb40fa1913e7";
export const P_PRODUCT_CREATE = "72c7d90b-e317-4bee-a1c6-232e312ef021";
export const P_PRODUCT_UPDATE = "ed6f62e6-51fc-46db-b8b6-0475c0f2ae4f";
export const P_PRODUCT_DELETE = "704e2a30-31fa-4e0d-a880-371df0edc2a7";

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor (public readonly repo: ProductRepository) {
        super(repo);
        this.listJoin = ['store', 'category'];
    }
}