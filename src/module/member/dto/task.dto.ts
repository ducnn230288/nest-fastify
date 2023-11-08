import { PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { Task } from '@model';

export class TaskResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: Task | null;
}

export class CreateTaskRequestDto extends PickType(Task, [
  'projectCode',
  'code',
  'name',
  'content',
  'start',
  'finish',
  'deadline',
  'priority',
  'level',
  'complete',
  'successors',
  'predecessors',
  'hours',
]) {}

export class ListTaskResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: Task[];
}
