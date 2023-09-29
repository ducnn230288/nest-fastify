import { ListStoreResponseDto } from '@dto';
import { Get, Query } from '@nestjs/common';
import { P_USER_LISTED, StoreService } from '@service';
import { Auth, Headers, PaginationQueryDto } from '@shared';
import { I18n, I18nContext } from 'nestjs-i18n';

@Headers('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  // @Auth({
  //   summary: 'Get List User',
  //   permission: P_USER_LISTED,
  // })
  @Get('list')
  async getAll(@I18n() i18n: I18nContext, @Query() paginationQuery: PaginationQueryDto): Promise<ListStoreResponseDto> {
    const [result, total] = await this.storeService.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List success'),
      count: total,
      data: result,
    };
  }
}
