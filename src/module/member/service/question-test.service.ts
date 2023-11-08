import { Injectable } from '@nestjs/common';
import { Question, QuestionTest, Task, User } from '@model';

import { BaseService } from '@shared';
import { QuestionTestRepository, TaskRepository } from '@repository';
import { QuestionRepository } from '../repository/question.repository';
import { CreateQuestionTestRequestDto } from '@dto';
import { DataSource } from 'typeorm';
import { QuestionService } from './question.service';

export const P_QUESTION_TEST_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f10';
export const P_QUESTION_TEST_DETAIL = 'bd11ca07-2cf4-473f-ac43-50b0eac57710';
export const P_QUESTION_TEST_CREATE = 'becacb61-46c5-445e-bce4-0f3a2cfed510';
export const P_QUESTION_TEST_UPDATE = '972e4159-e3ce-416e-a526-ffd83039e010';
export const P_QUESTION_TEST_DELETE = 'cdece61b-f159-4dec-8b27-b7de50c9b810';

@Injectable()
export class QuestionTestService extends BaseService<QuestionTest> {
  constructor(public repo: QuestionTestRepository,
    private dataSource: DataSource,
    private questionServive: QuestionService
  ) {
    super(repo);
    this.listQuery = [];
    this.listJoin = [];
    this.listJoinCount = [];
  }

  async saveAnswer(body: CreateQuestionTestRequestDto, user: User): Promise<QuestionTest | number | any> {
    const { answer } = body
    let point: number = 0;

    // Lặp qua câu trả lời, mỗi câu đúng được 10đ
    for (const [key, value] of Object.entries(answer)) {
      const question = await this.questionServive.findOne(key)
      if (question && question?.correct === value) point += 10
    }
    // Lưu đáp án
    
    return await this.create({ userId: user.id, answer, point })
  }
}
