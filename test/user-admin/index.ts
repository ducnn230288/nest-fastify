import { CreateUserAdminRequestDto, UpdateUserAdminRequestDto } from '@dto';
import '@factories';
import { UserAdmin } from '@model';
import { HttpStatus } from '@nestjs/common';
import { UserAdminService } from '@service';
import { prefixRouter } from '@shared';
import { BaseTest } from '@test';
import request from 'supertest';
import { useSeederFactoryManager } from 'typeorm-extension';

const controller = '/user-admin';
export const API = prefixRouter + controller;

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  const factoryManager = useSeederFactoryManager();

  let data: CreateUserAdminRequestDto;
  let dataUpdate: UpdateUserAdminRequestDto;
  let result: UserAdmin | null;

  it(`Create [POST ${API}]`, async () => {
    data = await factoryManager.get(UserAdmin).make();
    const { body } = await request(BaseTest.server)
      .post(API)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(data));
      result = body.data;
    }
  });

  it('Get all [GET /api/user-admin]', async () => {
    const { body } = await request(BaseTest.server)
      .get(API)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data[0]).toEqual(jasmine.objectContaining(data));
  });

  it('Get one [GET /api/user-admin/:id]', async () => {
    if (!type) result = await BaseTest.moduleFixture!.get(UserAdminService).create(data);

    const { body } = await request(BaseTest.server)
      .get(API + `/${result?.id}`)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data).toEqual(jasmine.objectContaining(data));
  });

  it('Update one [PUT /api/user-admin/:id]', async () => {
    dataUpdate = await factoryManager.get(UserAdmin).make();

    const { body } = await request(BaseTest.server)
      .put(API + `/${result?.id}`)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
  });

  it('Delete one [DELETE /api/user-admin/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete(API + `/${result?.id}`)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
  });

  return afterAll(BaseTest.initAfterAll);
};
