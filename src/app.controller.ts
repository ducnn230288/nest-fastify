import { Get, Controller, Render, ValidationPipe, Query } from '@nestjs/common';
import hbs from 'hbs';
import { join } from 'path';
import { ProductCategoryService } from './module/product/service/product-category.service';
import { PaginationQueryDto } from './shared/base';
import { ProductService } from './module/product/service/product.service';

@Controller()
export class AppController {
  constructor(
   private categoryService : ProductCategoryService,
   private productService : ProductService
  ) { }
  @Get()
  @Render('pages/home/index')
 async root( @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto): Promise<any> {
    const cate = await this.categoryService.findAll(paginationQuery);
    const pro = await this.productService.findAll(paginationQuery);
    
    return {
      title: 'Home Page',
      content: 'Home Page',
      categories : cate[0] || [],
      products : pro[0] || []
    }
  }
}
