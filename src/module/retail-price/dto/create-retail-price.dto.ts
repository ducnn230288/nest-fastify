import { OmitType, PickType } from '@nestjs/swagger';
import { RetailPrice } from '../model/retail-price.model';

export class CreateRetailPriceDto extends PickType(RetailPrice, [
  'unit',
  'coefficient',
  'price',
  'barcode',
  'code',
  'basePrice',
]) {}
