import { PartialType, PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
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
  'status',
  'level',
  'complete',
  'successors',
  'predecessors',
  'order',
] as const) {
  @IsArray()
  readonly assigneeIds: string[];
}

export class ListTaskResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: Task[];
}

export class UpdateTaskRequestDto extends PickType(Task, [
  'level',
  'name',
  'code',
  'content',
  'deadline',
  'priority',
  'order',
  'successors',
  'predecessors',
  'complete',
] as const) {}
