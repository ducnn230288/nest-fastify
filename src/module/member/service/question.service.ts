import { Injectable } from '@nestjs/common';
import { Question, Task } from '@model';

import { BaseService } from '@shared';
import { TaskRepository } from '@repository';
import { QuestionRepository } from '../repository/question.repository';

export const P_QUESTION_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f10';
export const P_QUESTION_DETAIL = 'bd11ca07-2cf4-473f-ac43-50b0eac57710';
export const P_QUESTION_CREATE = 'becacb61-46c5-445e-bce4-0f3a2cfed510';
export const P_QUESTION_UPDATE = '972e4159-e3ce-416e-a526-ffd83039e010';
export const P_QUESTION_DELETE = 'cdece61b-f159-4dec-8b27-b7de50c9b810';

@Injectable()
export class QuestionService extends BaseService<Question> {
  constructor(public repo: QuestionRepository) {
    super(repo);
    this.listQuery = [];
    this.listJoin = [];
    this.listJoinCount = [];
  }
}
