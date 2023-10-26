import { faker } from '@faker-js/faker';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { CreateDayoffRequestDto, CreateUserRequestDto } from '@dto';
import { DayOff, User } from '@model';
import { UserService } from '@service';
import { Example } from '@shared';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  const factoryManager = useSeederFactoryManager();
  let dataDayoff: CreateDayoffRequestDto;
  let resultDayoff;

  it('Create [POST /api/dayoff]', async () => {
    dataDayoff = await factoryManager.get(DayOff).make();
    console.log(dataDayoff);

    // const {body} = await request(BaseTest.server)
    // .post('/api/dayoff')
    // .set('Authorization', 'Bearer ' + BaseTest.token)
    // .send(dataDayoff)
    // .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    // console.log(body);
  });
  // it('Get list [GET /api/dayoff]', async () => {});
  // it('Get detail [GET /api/dayoff/{id}]', async () => {});
  // it('Update [PUT /api/dayoff/{id}]', async () => {});
  // it('Update data status [PUT /api/dayoff/{id}/status]', async () => {});
  // it('Delete [DELETE /api/dayoff/{id}]', async () => {});
  return afterAll(BaseTest.initAfterAll);
};
