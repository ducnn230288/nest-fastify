import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { RetailPrice } from '../model/retail-price.model';
import { DataSource } from 'typeorm';

@Injectable()
export class RetailPriceRepository extends BaseRepository<RetailPrice> {
  constructor(public readonly dataSource: DataSource) {
    super(RetailPrice, dataSource.createEntityManager());
  }
}
