import { PartialType, PickType } from '@nestjs/swagger';
import { TaskSub } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

export class TaskSubResponeDto extends PartialType(DefaultResponsesDto) {
  readonly data: TaskSub | null;
}

export class CreateTaskSubRequestDto extends PickType(TaskSub, ['name', 'image', 'taskId'] as const) {}

export class ListTaskSubResponeDto extends PartialType(PaginationResponsesDto) {
  readonly data: TaskSub[];
}

export class UpdateTaskSubRequestDto extends PickType(TaskSub, ['completed'] as const) {}
