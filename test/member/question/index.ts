/* eslint-disable @typescript-eslint/no-unused-vars */

import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { CreateDayoffRequestDto } from '@dto';
import { DayOff, User, Task, Question, CodeType, Code, QuestionTest } from '@model';
import { CodeService, CodeTypeService, UserService } from '@service';
import { CreateTaskRequestDto, CreateQuestionRequestDto } from '@dto';
// import { CreateQuestionRequestDto } from 'src/module/member/dto/question.dto';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataQuestion: CreateQuestionRequestDto;

  let codeType;
  let code;
  let resultQuestion;
  let dataQuestionTest;
  let resultQuestionTest;


  it('Create [POST /api/question]', async () => {
    codeType = await BaseTest.moduleFixture!.get(CodeTypeService).create(await factoryManager.get(CodeType).make());

    code = await BaseTest.moduleFixture!.get(CodeService).create(
      await factoryManager.get(Code).make({
        type: codeType?.code,
      }),
    );
    dataQuestion = await factoryManager.get(Question).make({
      typeCode: code?.code
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

  it('Create [POST /api/question-test]', async () => {
    let answerObj = {}
    answerObj[resultQuestion?.id] = "D";
    dataQuestionTest = await factoryManager.get(QuestionTest).make({
      answer :answerObj
    })
 
    const { point,...data } = dataQuestionTest
    

    const { body } = await request(BaseTest.server)
      .post('/api/question-test')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data) 
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);      

      if (type) {
        expect(body.data).toEqual(jasmine.objectContaining(data));
        resultQuestionTest = body.data;
      }
  });


  return afterAll(BaseTest.initAfterAll);
};
