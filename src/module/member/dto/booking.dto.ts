import { PartialType, PickType } from '@nestjs/swagger';
import { Booking } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

export class CreateBookingRequestDto extends PickType(Booking, [
  'name',
  'description',
  'startTime',
  'endTime',
  'typeCode',
  'itemCode',
] as const) {}

export class UpdateBookingRequestDto extends PickType(Booking, [
  'name',
  'description',
  'startTime',
  'endTime',
  'typeCode',
  'itemCode',
] as const) {}

export class BookingResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: Booking | null;
}
export class ListBookingResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: Booking[];
}
