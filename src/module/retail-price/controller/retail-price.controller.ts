import { Auth, AuthUser, Headers, MaxGroup, SerializerBody } from '@shared';
import { P_SUB_ORGANIZATION_CREATE,RetailPriceService } from '@service';
import { Body, Post } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateRetailPriceDto } from '@dto';
import { User } from '@model';
@Headers('retail-price')
export class RetailPriceController {
  constructor(private service: RetailPriceService) {}

  @Auth({
    summary: 'create retail price',
    permission: P_SUB_ORGANIZATION_CREATE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateRetailPriceDto,
    @AuthUser() user: User,
  ): Promise<any> {
    return {
      message: i18n.t('common.Create Success'),
    
    };
  }
 

}