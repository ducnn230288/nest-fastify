import { faker } from '@faker-js/faker';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { CreateDayoffRequestDto, CreateUserRequestDto } from '@dto';
import { DayOff, User, UserRole } from '@model';
import { P_DAYOFF_CREATE, UserRoleService, UserService } from '@service';
import { Example } from '@shared';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  const factoryManager = useSeederFactoryManager();
  let dataDayoff: CreateDayoffRequestDto;
  let resultDayoff: DayOff | null;

  it('Create [POST /api/dayoff]', async () => {
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
      const { dateLeaveEnd, dateLeaveStart, code, ...test } = dataDayoff;
      expect(body.data[0]).toEqual(jasmine.objectContaining(test));
    }
  });
  // it('Get detail [GET /api/dayoff/{id}]', async () => {
  //   const dataRole = await factoryManager.get(UserRole).make({
  //     permissions: [P_DAYOFF_CREATE],
  //   });
  //   const resultRole = await BaseTest.moduleFixture?.get(UserRoleService).create(dataRole);
  //   const dataUser = {
  //     ...(await factoryManager.get(User).make({ roleCode: resultRole?.code })),
  //     retypedPassword: Example.password,
  //   };
  //   const resultUser = await BaseTest.moduleFixture?.get(UserService).create(dataUser);
  // });
  // it('Update [PUT /api/dayoff/{id}]', async () => {});
  // it('Update data status [PUT /api/dayoff/{id}/status]', async () => {});
  // it('Delete [DELETE /api/dayoff/{id}]', async () => {});
  return afterAll(BaseTest.initAfterAll);
};
