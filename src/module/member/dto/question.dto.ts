import { PartialType, PickType } from "@nestjs/swagger";
import { DefaultResponsesDto } from "@shared";
import { Question } from "@model";

export class QuestionRequestDto extends PartialType(DefaultResponsesDto) { }

export class CreateQuestionRequestDto extends PickType(Question, ['question', 'options', 'correct', 'level']) {}