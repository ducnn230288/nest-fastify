import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '@shared';
import { Order } from '../model/order.model';

export class OrderDto extends PartialType(OmitType(Order, ['isDeleted', 'createdAt', 'updatedAt'] as const)) {}

export class CreateOrderRequestDto {}

export class ListOrderResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: OrderDto[];
}
