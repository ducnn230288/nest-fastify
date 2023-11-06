import { PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto } from '@shared';
import { Task } from '@model';

export class TaskRequesDto extends PartialType(DefaultResponsesDto) {}

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
