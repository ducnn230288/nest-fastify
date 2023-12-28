import { BaseRepository } from "@shared";
import { Store } from '@model';
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class StoreRepository extends BaseRepository<Store> {
    constructor(public readonly dataSource: DataSource) {
        super(Store, dataSource.createEntityManager());
    }
}