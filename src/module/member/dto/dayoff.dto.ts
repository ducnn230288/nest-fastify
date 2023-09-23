import { PickType, PartialType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { DayOff } from '@model';
import { StreamableFile } from '@nestjs/common';
export class CreateDayoffRequestDto extends PickType(DayOff, [
  'code',
  'time',
  'type',
  'reason',
  'image',
  'dateLeaveStart',
  'dateLeaveEnd',
  'staffId',
  'timeNumber',
  'managerId',
  // 'staffHId',
] as const) {}

export class StatusDayoffRequestDto extends PickType(DayOff, ['status', 'reasonReject'] as const) {}

export class UpdateDayoffRequestDto extends PickType(DayOff, [
  'time',
  'type',
  'reason',
  'image',
  'dateLeaveStart',
  'dateLeaveEnd',
  'timeNumber',
] as const) {}

export class DayoffResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: DayOff | null;
}
export class ListDayoffResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: DayOff[];
}
