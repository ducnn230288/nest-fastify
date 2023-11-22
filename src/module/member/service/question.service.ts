import { BadRequestException, Injectable } from '@nestjs/common';
import { Question, Task } from '@model';

import { BaseService } from '@shared';
import { TaskRepository } from '@repository';
import { QuestionRepository } from '../repository/question.repository';
import { Code, DataSource } from 'typeorm';
import '@factories';
import { useSeederFactoryManager } from 'typeorm-extension';
import { I18nContext } from 'nestjs-i18n';

export const P_QUESTION_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f31';
export const P_QUESTION_DETAIL = 'bd11ca07-2cf4-473f-ac43-50b0eac57732';
export const P_QUESTION_CREATE = 'becacb61-46c5-445e-bce4-0f3a2cfed533';
export const P_QUESTION_UPDATE = '972e4159-e3ce-416e-a526-ffd83039e034';
export const P_QUESTION_DELETE = 'cdece61b-f159-4dec-8b27-b7de50c9b835';

@Injectable()
export class QuestionService extends BaseService<Question> {
  constructor(public repo: QuestionRepository) {
    super(repo);
    this.listQuery = [];
    this.listJoin = [];
    this.listJoinCount = [];
  }

  // async createMany(code: Code): Promise<Question[]> {
  //   const datas: Question[] = [];
  //   const factoryManager = useSeederFactoryManager();

  //   for (let i = 0; i < 19; i++) {
  //     const data = await factoryManager.get(Question).make({
  //       level: 1,
  //       typeCode: code?.code,
  //     });
  //     datas.push((await this.create(data)) as Question);
  //   }
  //   return datas;
  // }

  async getManyQuestionForTest(where: object[]): Promise<[Question[], number]> {
    const i18n = I18nContext.current()!;
    if (where.length !== 2) throw new BadRequestException(i18n.t('Common.Data level or typeCode not found'));
    const [questions, total] = await this.findAll({ where });

    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    const ramdom: Question[] = questions.slice(0, questions.length <= 20 ? questions.length : 20);
    return [ramdom, ramdom.length];
  }
}
