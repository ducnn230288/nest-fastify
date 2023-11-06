/* eslint-disable @typescript-eslint/no-unused-vars */

import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { CreateDayoffRequestDto } from '@dto';
import { DayOff, User, Task } from '@model';
import { UserService } from '@service';
import { CreateTaskRequestDto } from '@dto';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataTask: CreateTaskRequestDto;

  it('Create [POST /api/task]', async () => {
    dataTask = await factoryManager.get(Task).make();

    const { body } = await request(BaseTest.server)
      .post('/api/task')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataTask);

    console.log(body);
  });

  return afterAll(BaseTest.initAfterAll);
};
