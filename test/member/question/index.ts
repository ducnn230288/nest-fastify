/* eslint-disable @typescript-eslint/no-unused-vars */

import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { CreateDayoffRequestDto } from '@dto';
import { DayOff, User, Task, Question } from '@model';
import { UserService } from '@service';
import { CreateTaskRequestDto, CreateQuestionRequestDto } from '@dto';
// import { CreateQuestionRequestDto } from 'src/module/member/dto/question.dto';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataQuestion: CreateQuestionRequestDto;

  it('Create [POST /api/question]', async () => {
    dataQuestion = await factoryManager.get(Question).make();

    const { body } = await request(BaseTest.server)
      .post('/api/question')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataQuestion);

    console.log(body);
  });

  return afterAll(BaseTest.initAfterAll);
};
