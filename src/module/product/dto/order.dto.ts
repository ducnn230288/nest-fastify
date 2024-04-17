import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsString, IsUUID, IsArray, IsOptional } from 'class-validator';

import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { Order, OrderAddress, Product } from '@model';

export class OrderProductDto extends PickType(Product, [
  'id',
  'name',
  'price',
  'quantity',
  'discount',
  'productStoreId',
] as const) {}

export class OrderDto extends PartialType(OmitType(Order, ['updatedAt', 'isDisabled', 'isDeleted'] as const)) {}

export class OrderAddressDto extends PickType(OrderAddress, ['codeWard', 'codeDistrict', 'codeProvince'] as const) {}

export class CreateOrderRequestDto extends PickType(Order, ['reason'] as const) {
  @IsArray()
  products: OrderProductDto[];
  @IsString()
  codeWard: string;
  @IsString()
  codeDistrict: string;
  @IsString()
  codeProvince: string;
  @IsString()
  specificAddress?: string;

  @IsOptional()
  @IsUUID()
  addressId: string;
}

export class ListOrderResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: OrderDto[] | null;
}

export class OrderUpdateStatusDto extends PartialType(PaginationResponsesDto) {
  readonly data: OrderDto;
}

export class OrderResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: OrderDto | null;
}
