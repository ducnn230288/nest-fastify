import { DataSource } from "typeorm";
import { StoreRequest } from "@model";
import { BaseRepository } from "@shared";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StoreRequestRepository extends BaseRepository<StoreRequest> {
    constructor(private readonly dataSource: DataSource) {
        super(StoreRequest, dataSource.createEntityManager());
    }
}