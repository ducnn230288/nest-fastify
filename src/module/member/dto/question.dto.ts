import { PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto, PaginationResponsesDto } from '@shared';
import { Question, QuestionTest } from '@model';
import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionRequestDto extends PartialType(DefaultResponsesDto) {}

export class CreateQuestionRequestDto extends PickType(Question, [
  'question',
  'options',
  'correct',
  'level',
  'typeCode',
  'image',
]) {}

export class GetAllQuestionRequestDto extends PickType(Question, ['level', 'typeCode']) {}

export class UpdateQuestionRequestDto extends PartialType(CreateQuestionRequestDto) {}

export class ListQuestionResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: Question[];
}

export class QuestionResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: Question | null;
}

export class CreateQuestionTestRequestDto extends PickType(QuestionTest, ['answer']) {}

export class ListQuestionTestResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: QuestionTest[];
}

export class QuestionTestResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: QuestionTest | null;
}

export class QueryFindQuestionDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  level?: number;

  @IsString()
  @IsOptional()
  typeCode?: string;
}
