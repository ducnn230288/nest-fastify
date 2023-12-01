import { PartialType, PickType } from '@nestjs/swagger';

import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { File } from '@model';

export class UpdateFileRequestDto extends PickType(File, ['url', 'description'] as const) {}

export class FileResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: File | null;
}
export class ListFileResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: File[];
}
export interface IEditor {
  id: string;
  data: {
    text: string;
    level?: string;
    file?: {
      url?: string;
    };
    caption?: string;
    stretched?: boolean;
    withBorder?: boolean;
    withBackground?: boolean;
  };
  type: string;
}
