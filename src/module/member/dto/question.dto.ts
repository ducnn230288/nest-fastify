import { PartialType, PickType } from "@nestjs/swagger";
import { DefaultResponsesDto } from "@shared";
import { Question, QuestionTest } from "@model";


export class QuestionRequestDto extends PartialType(DefaultResponsesDto) { }

export class CreateQuestionRequestDto extends PickType(Question, ['question', 'options', 'correct', 'level', 'typeCode', 'image']) { }

export class CreateQuestionTestRequestDto extends PickType(QuestionTest, ['answer']) {
}