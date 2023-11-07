import { faker } from '@faker-js/faker';
/* eslint-disable @typescript-eslint/no-unused-vars */

import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { BaseTest } from '@test';
import { CreateDayoffRequestDto, TaskRequest, UpdateTaskTimesheetRequestDto } from '@dto';
import {
  CreateTaskRequestDto,
  CreateTaskTimesheetRequestDto,
  CreateTaskWorkRequestDto,
  UpdateTaskWorkRequestDto,
  TaskWorkResponseDto,
} from '@dto';
import '@factories';
import dayjs from 'dayjs';
import { DayOff, User, Task, CodeType, Code, TaskTimesheet, TaskWork } from '@model';
import { TaskService, CodeService, CodeTypeService, UserService } from '@service';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataTask: CreateTaskRequestDto;
  let resultTask: Task | null;

  let dataTaskTimesheet: CreateTaskTimesheetRequestDto;
  let resultTaskTimesheet: TaskTimesheet;
  let updateTaskTimesheet: UpdateTaskTimesheetRequestDto;

  let dataTaskWork: CreateTaskWorkRequestDto;
  let dataTaskWorks: CreateTaskWorkRequestDto[];
  let resultTaskWork: TaskWork;
  let updateTaskWork: UpdateTaskWorkRequestDto;
  let codeType: CodeType | null;
  let code: Code | null;

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

  // it('Create [POST /api/task-work]', async () => {
  //   dataTaskWork = await factoryManager.get(TaskWork).make({
  //     taskId: resultTask?.id,
  //   });

  //   const { body } = await request(BaseTest.server)
  //     .post('/api/task-work')
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .send(dataTaskWork)
  //     .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

  //   if (type) {
  //     console.log(body.data);
  //   }
  // });

  // API Task-Timesheet

  it('Create [POST /api/task-timesheet]', async () => {
    if (!type) {
      resultTask = await BaseTest.moduleFixture!.get(TaskService).create(dataTask);
    }

    const data: TaskRequest = {
      id: resultTask?.id,
    };

    dataTaskTimesheet = {
      listTask: [{ id: resultTask?.id }],
    };

    const { body } = await request(BaseTest.server)
      .post('/api/task-timesheet')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataTaskTimesheet)
      .expect(HttpStatus.CREATED || HttpStatus.FORBIDDEN);

    const test = dayjs(body.data.start).isSame(new Date(), 'day');
    expect(test).toBeTruthy();
    expect(body.data.finish).toBeNull();
    resultTaskTimesheet = body.data;
  });

  it('Get all [GET /api/task-timesheet]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/task-timesheet')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    expect(body.data[0]).toEqual(jasmine.objectContaining(resultTaskTimesheet));
  });

  it('Get one [GET /api/task-timesheet/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/task-timesheet/' + resultTaskTimesheet?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    expect(body.data).toEqual(jasmine.objectContaining(resultTaskTimesheet));
  });

  // it('Update [PUT /api/task-timesheet/:id]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .put('/api/task-timesheet/' + resultTaskTimesheet?.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .send(updateTaskTimesheet)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  // });

  // Test API delete Task, Task-Timesheet, TaskWork

  it('Delete [DELETE /api/task-timesheet/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/task-timesheet/' + resultTaskTimesheet?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { isDeleted, updatedAt, ...test } = resultTaskTimesheet!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  /* */

  return afterAll(BaseTest.initAfterAll);
};
