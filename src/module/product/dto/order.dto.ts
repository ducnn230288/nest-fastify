import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '@shared';
import { Order } from '../model/order.model';
import { OrderAddress, Product } from '@model';
import { IsString, IsUUID, IsArray } from 'class-validator';

export class OrderProduct extends PickType(Product, ['id', 'name', 'price', 'quantity', 'productStoreId'] as const) {}

export class OrderDto extends PartialType(OmitType(Order, [] as const)) {}

export class OrderAddressDto extends PickType(OrderAddress, ['codeWard', 'codeDistrict', 'codeProvince'] as const) {}

export class CreateOrderRequestDto extends PickType(Order, ['reason'] as const) {
  @IsArray()
  products: OrderProduct[];
  @IsString()
  codeWard: string;
  @IsString()
  codeDistrict: string;
  @IsString()
  codeProvince: string;
  @IsString()
  specificAddress?: string;
  @IsUUID()
  addressId: string;
}

export class ListOrderResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: OrderDto[];
}
