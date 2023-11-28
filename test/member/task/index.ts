import { faker } from '@faker-js/faker';
/* eslint-disable @typescript-eslint/no-unused-vars */

import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { BaseTest } from '@test';
import {
  CreateDayoffRequestDto,
  CreateUserRequestDto,
  TaskRequest,
  UpdateTaskRequestDto,
  CheckInRequestDto,
  CheckOutRequestDto,
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
  DayoffService,
} from '@service';
import c from 'config';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataTask: CreateTaskRequestDto;
  let resultTask: Task | null;

  let dataTaskUpdate: UpdateTaskRequestDto;
  let resultUser: User | null;

  let checkInRequestDto: CheckInRequestDto;
  let checkOutRequestDto: CheckOutRequestDto;

  let resultTaskTimesheet: TaskTimesheet;

  let dataDayoff: CreateDayoffRequestDto;
  let resultDayoff: DayOff | null;

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
    checkInRequestDto = {
      listTask: [{ id: resultTask?.id }],
    };

    const { body } = await request(BaseTest.server)
      .post('/api/task-timesheet')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(checkInRequestDto)
      .expect(HttpStatus.CREATED || HttpStatus.FORBIDDEN);

    const test = dayjs(body.data.start).isSame(new Date(), 'day');
    expect(test).toBeTruthy();
    expect(body.data.finish).toBeNull();
    resultTaskTimesheet = body.data;
    resultTaskWork = resultTaskTimesheet.works![0];
  });

  it('Check Out [POST /api/task-timesheet', async () => {
    const taskWork = await factoryManager.get(TaskWork).make({
      id: resultTaskTimesheet.works![0].id,
      taskId: resultTaskWork.taskId,
      hours: 1000,
    });

    checkOutRequestDto = {
      listTaskWork: [taskWork],
      note: faker.lorem.paragraph(),
    };

    const { body } = await request(BaseTest.server)
      .put('/api/task-timesheet')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(checkOutRequestDto)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);
    const { updatedAt, finish, works, note, ...testTimesheet } = resultTaskTimesheet!;
    expect(body.data).toEqual(jasmine.objectContaining(testTimesheet));
    expect(body.data.note).toEqual(checkOutRequestDto.note);
    expect(body.data.works[0]).toEqual(jasmine.objectContaining(checkOutRequestDto.listTaskWork![0]));

    resultTaskTimesheet = body.data;
    resultTaskWork = body.data.works[0];
  });

  it('Get All [GET /api/task-timesheet]', async () => {
    // Test get all with have day off

    // const res = await request(BaseTest.server)
    //   .get('/api/auth/profile')
    //   .set('Authorization', 'Bearer ' + BaseTest.token);
    // resultUser = res.body.data;

    // resultUser = await BaseTest.moduleFixture!.get(UserService).update(resultUser!.id!, {
    //   managerId: resultUser!.id,
    // });

    // dataDayoff = await factoryManager.get(DayOff).make();
    // Object.assign(dataDayoff, { staffId: resultUser?.id });
    // resultDayoff = await BaseTest.moduleFixture!.get(DayoffService).create(dataDayoff);

    const { body } = await request(BaseTest.server)
      .get('/api/task-timesheet')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    const { dayoff, ...timesheet } = body.data[0];
    const { user, works, ...testTimesheet } = resultTaskTimesheet!;
    const { createdAt, isDeleted, updatedAt, ...testCode } = code!;

    expect(timesheet).toEqual(jasmine.objectContaining(testTimesheet));
    expect(timesheet.works[0]).toEqual(jasmine.objectContaining(resultTaskWork));
    expect(timesheet.works[0].task.project).toEqual(jasmine.objectContaining(testCode));

    if (dayoff) {
      const { dateLeaveEnd, dateLeaveStart, staffId, ...testDayoff } = dataDayoff;
      expect(dayoff).toEqual(jasmine.objectContaining(testDayoff));
    }
  });

  it('Get one [GET /api/task-timesheet/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/task-timesheet/' + resultTaskTimesheet?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    const { dayoff, ...timesheet } = body.data;
    const { user, works, ...testTimesheet } = resultTaskTimesheet!;
    const { createdAt, isDeleted, updatedAt, ...testCode } = code!;

    expect(timesheet).toEqual(jasmine.objectContaining(testTimesheet));
    expect(timesheet.works[0]).toEqual(jasmine.objectContaining(resultTaskWork));
    expect(timesheet.works[0].task.project).toEqual(jasmine.objectContaining(testCode));

    if (dayoff) {
      const { dateLeaveEnd, dateLeaveStart, staffId, ...testDayoff } = dataDayoff;
      expect(dayoff).toEqual(jasmine.objectContaining(testDayoff));
    }
  });

  it('Update [PUT /api/task/{id}]', async () => {
    const fakeData = await factoryManager.get(Task).make({
      finish: new Date(),
      status: 0,
    });
    const { code, ...dataTaskUpdate } = fakeData;
    const { body } = await request(BaseTest.server)
      .put('/api/task/' + resultTask?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataTaskUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      const { deadline, start } = dataTaskUpdate;
      expect(body.data).toEqual(
        jasmine.objectContaining({
          deadline: deadline?.toISOString(),
          start: start?.toISOString(),
        }),
      );
      resultTask = body.data;
    }
  });

  // Test API delete Task, Task-Timesheet, TaskWork
  it('Delete [DELETE /api/task-timesheet/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/task-timesheet/' + resultTaskTimesheet?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { works, user, updatedAt, isDeleted, ...test } = resultTaskTimesheet!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
      expect(body.data.works[0]).toEqual(jasmine.objectContaining(resultTaskWork));
    }
  });

  it('Delete [DELETE /api/task/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/task/' + resultTask?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { updatedAt, ...test } = resultTask!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  /* */
  return afterAll(BaseTest.initAfterAll);
};
