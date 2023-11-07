/* eslint-disable @typescript-eslint/no-unused-vars */

import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { DayOff, User, Task, CodeType, Code } from '@model';
import { CodeService, CodeTypeService, UserService } from '@service';
import { CreateTaskRequestDto } from '@dto';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataTask: CreateTaskRequestDto;
  let codeType: CodeType | null;
  let code: Code | null;

  let resultTask;

  it('Create [POST /api/task]', async () => {
    codeType = await BaseTest.moduleFixture!.get(CodeTypeService).create(await factoryManager.get(CodeType).make());

    code = await BaseTest.moduleFixture!.get(CodeService).create(
      await factoryManager.get(Code).make({
        type: codeType?.code,
      }),
    );

    dataTask = await factoryManager.get(Task).make({
      projectCode: code?.code,
    });

    const { body } = await request(BaseTest.server)
      .post('/api/task')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataTask)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      const { start, finish, deadline } = dataTask;
      expect(body.data).toEqual(
        jasmine.objectContaining({
          start: start?.toISOString(),
          finish: finish?.toISOString(),
          deadline: deadline?.toISOString(),
        }),
      );
      resultTask = body.data;
    }
  });

  // it('Get list [GET /api/task]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .get('/api/task')
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   console.log(body);
  // });

  return afterAll(BaseTest.initAfterAll);
};
