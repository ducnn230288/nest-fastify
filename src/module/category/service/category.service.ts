import { Injectable } from '@nestjs/common';

import { BaseService } from '@shared';
import { Category } from '@model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryRepository } from '@repository';

export const P_CATEGORY_LISTED = '4c34dc92-cbbe-4419-8dbc-745818d76098';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    public repo: Repository<Category>,
    public repoPost: CategoryRepository,
  ) {
    super(repo);
  }
}
