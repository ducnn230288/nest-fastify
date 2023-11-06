import { PartialType, PickType } from '@nestjs/swagger';
import { TaskWork } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

export class CreateTaskWordDto extends PickType(TaskWork, ['hours', 'taskId', 'timesheetId'] as const) {}

export class UpdateTaskWordRequestDto extends PickType(TaskWork, [] as const) {}

export class TaskWordResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: TaskWork | null;
}
export class ListTaskWordResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: TaskWork[];
}
