import { Get, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Headers, PaginationQueryDto } from '@shared';
import { ProductService } from '@service';
import { ListProductResponseDto, ProductDto } from '@dto';

@Headers('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('list')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListProductResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }
}
