import { BaseService } from "@shared";
import { StoreRequest } from "@model";
import { DataSource } from "typeorm";
import { StoreRequestRepository } from "@repository";
import { Injectable } from "@nestjs/common";


export const P_STORE_REQUEST_CREATE = '8f3d2c8e-7d5e-4d6c-8b4f-7f2f8c6f8c6f'
export const P_STORE_REQUEST_FIND_ALL = '8f3d2c8e-7d5e-4d6c-8b4f-7f2f8c6f8c6g'
export const P_STORE_REQUEST_FIND_ONE = '8f3d2c8e-7d5e-4d6c-8b4f-7f2f8c6f8c6h'
export const P_STORE_REQUEST_REJECT = '8f3d2c8e-7d5e-4d6c-8b4f-7f2f8c6f8c6a'
export const P_STORE_REQUEST_ACCEPT = '8f3d2c8e-7d5e-4d6c-8b4f-7f2f8c6f8c6b'



@Injectable()
export class StoreRequestService extends BaseService<StoreRequest> {
    constructor(
        public repo: StoreRequestRepository
    ) {
        super(repo);
        this.listJoin = [];
    }
}