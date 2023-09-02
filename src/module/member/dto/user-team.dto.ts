import { PickType, PartialType } from '@nestjs/swagger';
import { UserTeam } from '@model';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
export class CreateTeamRequestDto extends PickType(UserTeam, ['description', 'name', 'managerId'] as const) {}
export class UpdateTeamRequestDto extends PartialType(CreateTeamRequestDto) {}
export class ListTeamResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: UserTeam[];
}
export class TeamResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: UserTeam | null;
}
