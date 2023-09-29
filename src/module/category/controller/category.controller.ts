import { Get, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Headers, PaginationQueryDto } from '@shared';
import { CategoryService } from '@service';
import { ListCategoryResponseDto } from '@dto';

@Headers('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('list')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListCategoryResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }
}
