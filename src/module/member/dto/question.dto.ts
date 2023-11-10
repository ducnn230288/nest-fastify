<<<<<<< HEAD
import { PartialType, PickType } from "@nestjs/swagger";
import { DefaultResponsesDto, PaginationResponsesDto } from "@shared";
import { Question, QuestionTest } from "@model";
=======
import { PartialType, PickType } from '@nestjs/swagger';
import { DefaultResponsesDto } from '@shared';
import { Question, QuestionTest } from '@model';
>>>>>>> 0e8ab6fd370cf79da91d0dec3aca31e7f23e7d43

export class QuestionRequestDto extends PartialType(DefaultResponsesDto) {}

export class CreateQuestionRequestDto extends PickType(Question, [
  'question',
  'options',
  'correct',
  'level',
  'typeCode',
  'image',
]) {}

<<<<<<< HEAD
export class CreateQuestionRequestDto extends PickType(Question, ['question', 'options', 'correct', 'level', 'typeCode', 'image']) { }
export class UpdateQuestionRequestDto extends PartialType(CreateQuestionRequestDto) { }

export class CreateQuestionTestRequestDto extends PickType(QuestionTest, ['answer']) {
}

export class ListQuestionResponseDto extends PartialType(PaginationResponsesDto) {
    readonly data: Question[];
}

export class QuestionResponseDto extends PartialType(DefaultResponsesDto) {
    readonly data: Question | null;
}

export class ListQuestionTestResponseDto extends PartialType(PaginationResponsesDto) {
    readonly data: QuestionTest[];
}
=======
export class CreateQuestionTestRequestDto extends PickType(QuestionTest, ['answer']) {}
>>>>>>> 0e8ab6fd370cf79da91d0dec3aca31e7f23e7d43
