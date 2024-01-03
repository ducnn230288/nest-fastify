import { BaseService } from '@shared';
import { RetailPrice } from '../model/retail-price.model';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RetailPriceRepository } from '../repository/retail-price.repository';
@Injectable()
export class RetailPriceService extends BaseService<RetailPrice> {
  constructor(
    public repo: RetailPriceRepository,
    public datasource: DataSource,
  ) {
    super(repo);
  }
}
