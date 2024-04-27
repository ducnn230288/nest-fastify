import { Injectable } from '@nestjs/common';
import { QuestionTest, User } from '@model';

import { BaseService } from '@shared';
import { QuestionTestRepository } from '@repository';
import { CreateQuestionTestRequestDto } from '@dto';
import { DataSource } from 'typeorm';
import { QuestionService } from './question.service';

export const P_QUESTION_TEST_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f20';
export const P_QUESTION_TEST_DETAIL = 'bd11ca07-2cf4-473f-ac43-50b0eac57721';
export const P_QUESTION_TEST_CREATE = 'becacb61-46c5-445e-bce4-0f3a2cfed522';
export const P_QUESTION_TEST_UPDATE = '972e4159-e3ce-416e-a526-ffd83039e023';
export const P_QUESTION_TEST_DELETE = 'cdece61b-f159-4dec-8b27-b7de50c9b824';

@Injectable()
export class QuestionTestService extends BaseService<QuestionTest> {
  constructor(
    public repo: QuestionTestRepository,
    private dataSource: DataSource,
    private questionServive: QuestionService,
  ) {
    super(repo);
    this.listQuery = [];
    this.listJoin = [];
    this.listJoinCount = [];
  }

  async saveAnswer(body: CreateQuestionTestRequestDto, user: User): Promise<QuestionTest | null> {
    const { answer } = body;
    let point = 0;

    for (const [key, value] of Object.entries(answer!)) {
      const question = await this.questionServive.findOne(key);
      if (question && question?.correct === value) point += 1;
    }
    return await this.create({ userId: user.id, answer, point });
  }
}
