import { PartialType, PickType } from '@nestjs/swagger';
import { TaskTimesheet } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';

export class CreateTaskTimesheetDto extends PickType(TaskTimesheet, ['start', 'finish'] as const) {}

export class UpdateTaskTimesheetRequestDto extends PickType(TaskTimesheet, [] as const) {}

export class TaskTimesheetResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: TaskTimesheet | null;
}
export class ListTaskTimesheetResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: TaskTimesheet[];
}
