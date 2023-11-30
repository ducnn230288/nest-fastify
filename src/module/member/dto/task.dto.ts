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
  'start',
  'deadline',
  'priority',
  'level',
  'complete',
  'successors',
  'predecessors',
] as const) {}

export class ListTaskResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: Task[];
}

export class UpdateTaskRequestDto extends PickType(Task, [
  'projectCode',
  'name',
  'start',
  'deadline',
  'priority',
  'level',
  'complete',
  'successors',
  'predecessors',
] as const) {}

export class UpdateTaskFinishDto extends PickType(Task, ['finish'] as const) {}
