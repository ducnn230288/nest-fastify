import { PartialType, PickType } from '@nestjs/swagger';
import { TaskWork } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

export class CreateTaskWorkRequestDto extends PickType(TaskWork, ['taskId'] as const) {}

export class UpdateTaskWorkRequestDto extends PickType(TaskWork, [] as const) {}

export class TaskWorkResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: TaskWork | null;
}
export class ListTaskWorkResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: TaskWork[];
}
