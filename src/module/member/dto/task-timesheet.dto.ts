import { PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

import { Code, Task, TaskTimesheet, TaskWork } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

export class TaskRequest extends PickType(Task, ['id'] as const) {}

export class TaskWorkRequest extends PickType(TaskWork, ['id', 'hours', 'taskId'] as const) {}

export class CreateTaskTimesheetRequestDto extends PickType(TaskTimesheet, [] as const) {
  @IsArray()
  readonly listTask: TaskRequest[];
}

export class UpdateTaskTimesheetRequestDto extends PickType(TaskTimesheet, ['note'] as const) {}

export class CheckInOrOutRequestDto extends PickType(TaskTimesheet, [] as const) {
  @IsArray()
  @IsOptional()
  readonly listTaskWork?: TaskWorkRequest[];

  @IsArray()
  @IsOptional()
  readonly listTask?: TaskRequest[];
}

export class TaskTimesheetResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: TaskTimesheet | null;
}

export class ListTaskTimesheetResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: TaskTimesheet[];
  // readonly project: Code;
}
