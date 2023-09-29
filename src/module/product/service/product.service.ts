import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@shared';
import { Product } from '@model';
import { ProductRepository } from '@repository';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    public repo: Repository<Product>,
    public repoProduct: ProductRepository,
  ) {
    super(repo);
  }
}
