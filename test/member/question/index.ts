import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { Question, CodeType, Code, QuestionTest } from '@model';
import { CodeService, CodeTypeService, QuestionService } from '@service';
import { CreateQuestionRequestDto } from '@dto';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataQuestion: CreateQuestionRequestDto;
  let codeType;
  let code;
  let resultQuestion: Question | null;
  let dataQuestionTest;
  let resultQuestionTest: QuestionTest | null;

  it('Create [POST /api/question]', async () => {
    codeType = await BaseTest.moduleFixture!.get(CodeTypeService).create(await factoryManager.get(CodeType).make());

    code = await BaseTest.moduleFixture!.get(CodeService).create(
      await factoryManager.get(Code).make({
        type: codeType.code,
      }),
    );
    dataQuestion = await factoryManager.get(Question).make({
      typeCode: code?.code,
      level: 1,
    });

    const { body } = await request(BaseTest.server)
      .post('/api/question')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataQuestion)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataQuestion));
      resultQuestion = body.data;
    }
  });

  it('Get all [GET /api/question]', async () => {
    // const datas = await BaseTest.moduleFixture!.get(QuestionService).createMany(code);
    for (let i = 0; i < 19; i++) {
      await BaseTest.moduleFixture!.get(QuestionService).create(dataQuestion);
    }

    const { body } = await request(BaseTest.server)
      .get('/api/question?level=1&perPage=20&typeCode=' + code.code)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    if (type) {
      const index = body.data.findIndex((item) => item.id === resultQuestion?.id);
      expect(body.data[index]).toEqual(jasmine.objectContaining(resultQuestion));
    } else {
      expect(body.count).toBeGreaterThan(0);
    }
  });

  it('Get one [GET /api/question:id]', async () => {
    if (!type) {
      resultQuestion = await BaseTest.moduleFixture!.get(QuestionService).create(dataQuestion);
    }

    const { body } = await request(BaseTest.server)
      .get('/api/question/' + resultQuestion?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(resultQuestion));
    }
  });

  it('Update [PUT /api/question/:id]', async () => {
    dataQuestion = await factoryManager.get(Question).make({
      typeCode: code?.code,
    });
    const { question, ...dataUpdate } = dataQuestion;
    const { body } = await request(BaseTest.server)
      .put('/api/question/' + resultQuestion?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
      resultQuestion = body.data;
    }
  });

  it('Create [POST /api/question-test]', async () => {
    const answerObj = {};
    answerObj[resultQuestion!.id!] = 'D';
    dataQuestionTest = await factoryManager.get(QuestionTest).make({
      answer: answerObj,
    });

    const { point, ...data } = dataQuestionTest;

    const { body } = await request(BaseTest.server)
      .post('/api/question-test')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data)
      .expect(HttpStatus.CREATED || HttpStatus.FORBIDDEN);

    expect(body.data).toEqual(jasmine.objectContaining(data));
    resultQuestionTest = body.data;
  });

  it('Get all [GET /api/question-test]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/question-test')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    expect(body.data[0]).toEqual(jasmine.objectContaining(resultQuestionTest));
  });

  it('Get One [GET /api/question-test/:id', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/question-test/' + resultQuestionTest?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    expect(body.data).toEqual(jasmine.objectContaining(resultQuestionTest));
  });

  it('Delete [DELETE /api/question-test/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/question-test/' + resultQuestionTest?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      const { updatedAt, ...test } = resultQuestionTest!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  it('Delete [DELETE /api/question/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/question/' + resultQuestion?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      const { updatedAt, ...test } = resultQuestion!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
