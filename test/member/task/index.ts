import { faker } from '@faker-js/faker';
/* eslint-disable @typescript-eslint/no-unused-vars */

import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { BaseTest } from '@test';
import {
  CheckInOrOutRequestDto,
  CreateDayoffRequestDto,
  CreateUserRequestDto,
  TaskRequest,
  UpdateTaskRequestDto,
  UpdateTaskTimesheetRequestDto,
} from '@dto';
import {
  CreateTaskRequestDto,
  CreateTaskTimesheetRequestDto,
  CreateTaskWorkRequestDto,
  UpdateTaskWorkRequestDto,
  TaskWorkResponseDto,
} from '@dto';
import '@factories';
import dayjs from 'dayjs';
import { DayOff, User, Task, CodeType, Code, TaskTimesheet, TaskWork, UserRole } from '@model';
import {
  TaskService,
  CodeService,
  CodeTypeService,
  UserService,
  UserRoleService,
  P_TASKTIMESHEET_LISTED,
  P_TASK_CREATE,
} from '@service';
import c from 'config';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataTask: CreateTaskRequestDto;
  let resultTask: Task | null;

  let dataTaskUpdate: UpdateTaskRequestDto;
  let resultUser: User | null;

  let dataRequestDto: CheckInOrOutRequestDto;
  let resultTaskTimesheet: TaskTimesheet;
  let updateTaskTimesheet: UpdateTaskTimesheetRequestDto;
  let dataCheckout: CheckInOrOutRequestDto;

  let resultTaskWork: TaskWork;

  let codeType: CodeType | null;
  let code: Code | null;

  it('Create [POST /api/task]', async () => {
    codeType = await BaseTest.moduleFixture!.get(CodeTypeService).create(await factoryManager.get(CodeType).make());

    code = await BaseTest.moduleFixture!.get(CodeService).create(
      await factoryManager.get(Code).make({
        type: codeType?.code,
      }),
    );
    const res = await request(BaseTest.server)
      .get('/api/user')
      .set('Authorization', 'Bearer ' + BaseTest.token);
    resultUser = res.body.data;

    dataTask = await factoryManager.get(Task).make({
      projectCode: code?.code,
    });

    const { body } = await request(BaseTest.server)
      .post('/api/task')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataTask)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      const { start, deadline } = dataTask;
      expect(body.data).toEqual(
        jasmine.objectContaining({
          start: start?.toISOString(),
          deadline: deadline?.toISOString(),
        }),
      );
      resultTask = body.data;
    }
  });

  it('Get list [GET /api/task]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/task')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(resultTask));
    }
  });

  it('Get one [GET /api/task/{id}]', async () => {
    if (!type) {
      resultTask = await BaseTest.moduleFixture!.get(TaskService).create(dataTask);
    }
    const { body } = await request(BaseTest.server)
      .get('/api/task/' + resultTask?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    if (type) {
      const { start, deadline } = dataTask;
      expect(body.data).toEqual(
        jasmine.objectContaining({
          start: start?.toISOString(),
          deadline: deadline?.toISOString(),
        }),
      );
    }
  });

  // API Task-Timesheet

  it('Check In [POST /api/task-timesheet]', async () => {
    if (!type) {
      resultTask = await BaseTest.moduleFixture!.get(TaskService).create(dataTask);
    }
    dataRequestDto = {
      listTask: [{ id: resultTask?.id }],
    };

    const { body } = await request(BaseTest.server)
      .post('/api/task-timesheet')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataRequestDto)
      .expect(HttpStatus.CREATED || HttpStatus.FORBIDDEN);
    // console.log(body);
    const test = dayjs(body.data.start).isSame(new Date(), 'day');
    expect(test).toBeTruthy();
    expect(body.data.finish).toBeNull();
    resultTaskTimesheet = body.data;
    resultTaskWork = resultTaskTimesheet.works![0];
  });

  it('Get all [GET /api/task-timesheet]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/task-timesheet')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    const { works, ...testTimesheet } = resultTaskTimesheet!;
    const { isDeleted, createdAt, updatedAt, ...testCode } = code!;

    expect(body.data[0]).toEqual(jasmine.objectContaining(testTimesheet));
    expect(body.data[0].works[0]).toEqual(jasmine.objectContaining(resultTaskWork));
    expect(body.data[0].works[0].task.project).toEqual(jasmine.objectContaining(testCode));
  });

  it('Get one [GET /api/task-timesheet/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/task-timesheet/' + resultTaskTimesheet?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    const { works, ...test } = resultTaskTimesheet;
    expect(body.data.works[0]).toEqual(jasmine.objectContaining(resultTaskWork));
    expect(body.data).toEqual(jasmine.objectContaining(test));
  });

  it('Update [PUT /api/task-timesheet/:id]', async () => {
    const dataUpdate = await factoryManager.get(TaskTimesheet).make();
    const dataNote = dataUpdate.note;
    updateTaskTimesheet = {
      note: dataNote,
    };

    const { body } = await request(BaseTest.server)
      .put('/api/task-timesheet/' + resultTaskTimesheet?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(updateTaskTimesheet)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    const { updatedAt, note, works, ...test } = resultTaskTimesheet!;
    expect(body.data).toEqual(jasmine.objectContaining(test));
    expect(body.data.note).toEqual(dataNote);

    resultTaskTimesheet.note = dataNote;
  });

  it('Check Out [POST /api/task-timesheet', async () => {
    const taskWork = await factoryManager.get(TaskWork).make({
      id: resultTaskTimesheet.works![0].id,
      taskId: resultTaskWork.taskId,
      hours: 1000,
    });

    dataRequestDto = {
      listTaskWork: [taskWork],
      note: faker.lorem.paragraph(),
    };
    const { listTask, ...data } = dataRequestDto!;
    const { body } = await request(BaseTest.server)
      .post('/api/task-timesheet')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataRequestDto)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);
    const { updatedAt, finish, works, note, ...testTimesheet } = resultTaskTimesheet!;
    expect(body.data).toEqual(jasmine.objectContaining(testTimesheet));
    expect(body.data.note).toEqual(dataRequestDto.note);
    expect(body.data.works[0]).toEqual(jasmine.objectContaining(dataRequestDto.listTaskWork![0]));
    resultTaskTimesheet.note = dataRequestDto.note;
  });

  it('Update [PUT /api/task/{id}]', async () => {
    const fakeData = await factoryManager.get(Task).make({
      finish: new Date(),
    });
    const { code, ...dataTaskUpdate } = fakeData;
    const { body } = await request(BaseTest.server)
      .put('/api/task/' + resultTask?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataTaskUpdate);
    // .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    console.log(body);

    // if (type) {
    //   const { deadline, start } = dataTaskUpdate;
    //   expect(body.data).toEqual(
    //     jasmine.objectContaining({
    //       deadline: deadline?.toISOString(),
    //       start: start?.toISOString(),
    //     }),
    //   );
    //   resultTask = body.data;
    // }
  });

  // Test API delete Task, Task-Timesheet, TaskWork

  it('Delete [DELETE /api/task-timesheet/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/task-timesheet/' + resultTaskTimesheet?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { updatedAt, works, user, isDeleted, finish, ...test } = resultTaskTimesheet!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  // it('Delete [DELETE /api/task/{id}]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .delete('/api/task/' + resultTask?.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   if (type) {
  //     const { updatedAt, complete, deadline, hours, finish, name, start, ...test } = resultTask!;
  //     expect(body.data).toEqual(jasmine.objectContaining(test));
  //   }
  // });
  /* */

  return afterAll(BaseTest.initAfterAll);
};
