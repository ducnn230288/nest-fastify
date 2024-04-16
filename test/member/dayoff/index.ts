/* eslint-disable @typescript-eslint/no-unused-vars */

import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { CreateDayoffRequestDto } from '@dto';
import { DayOff, User } from '@model';
import { UserService } from '@service';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  const factoryManager = useSeederFactoryManager();
  let dataDayoff: CreateDayoffRequestDto;
  let dataUser;
  let dataUpdateSlug;

  let resultDayoff: DayOff | null;
  let resultProfile: User | null;

  it('Create [POST /api/dayoff]', async () => {
    const res = await request(BaseTest.server)
      .get('/api/auth/profile')
      .set('Authorization', 'Bearer ' + BaseTest.token);
    resultProfile = res.body.data;

    dataUser = await BaseTest.moduleFixture!.get(UserService).update(resultProfile!.id!, {
      managerId: resultProfile!.id,
    });

    dataDayoff = await factoryManager.get(DayOff).make();

    const { body } = await request(BaseTest.server)
      .post('/api/dayoff')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataDayoff)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      const { dateLeaveEnd, dateLeaveStart, code, ...test } = dataDayoff;
      expect(body.data).toEqual(jasmine.objectContaining(test));
      resultDayoff = body.data;
    }
  });

  it('Get list [GET /api/dayoff]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/dayoff')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      // const { dateLeaveEnd, dateLeaveStart, code, ...test } = dataDayoff;
      expect(body.data[0]).toEqual(jasmine.objectContaining(resultDayoff));
    }
  });

  it('Get detail [GET /api/dayoff/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/dayoff/' + resultDayoff?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(resultDayoff));
    }
  });

  it('Update [PUT /api/dayoff/{id}]', async () => {
    const { reason, code, ...dataUpdate } = dataDayoff;
    const { body } = await request(BaseTest.server)
      .put('/api/dayoff/' + resultDayoff?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(resultDayoff));
    }
  });

  it('Update data status [PUT /api/dayoff/{id}/status]', async () => {
    dataUpdateSlug = {
      status: 1,
    };
    const { body } = await request(BaseTest.server)
      .put('/api/dayoff/' + resultDayoff?.id + '/status')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateSlug)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      const { dateLeaveStart, dateLeaveEnd, isDisabled, approvedAt, reasonReject, updatedAt, status, ...test } =
        resultDayoff!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  it('Delete [DELETE /api/dayoff/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/dayoff/' + resultDayoff?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      const { approvedAt, status, updatedAt, isDeleted, ...test } = resultDayoff!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
