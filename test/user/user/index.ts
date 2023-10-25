import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { User, UserRole } from '@model';
import { CreateUserRoleRequestDto, UpdateUserRoleRequestDto, UpdateUserRequestDto } from '@dto';
import { P_USER_CREATE, UserRoleService, UserService } from '@service';
import { Example } from '@shared';
import '@factories';
import { BaseTest } from '@test';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  const factoryManager = useSeederFactoryManager();

  let dataRole: CreateUserRoleRequestDto;
  let dataUpdateRole: UpdateUserRoleRequestDto;
  let resultRole: UserRole | null;

  let data: User;
  let dataUpdate: UpdateUserRequestDto;
  let result: User | null;

  // User-role: 7 api test
  it('Create [POST /api/user-role]', async () => {
    dataRole = await factoryManager.get(UserRole).make({ permissions: [P_USER_CREATE] });

    const { body } = await request(BaseTest.server)
      .post('/api/user-role')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataRole)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataRole));
      resultRole = body.data;
    }
  });

  it('Get all [GET /api/user-role]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/user-role')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data[0]).toEqual(jasmine.objectContaining(dataRole));
  });

  it('Get one [GET /api/user-role/:id]', async () => {
    if (!type) resultRole = await BaseTest.moduleFixture!.get(UserRoleService).create(dataRole);
    const { body } = await request(BaseTest.server)
      .get('/api/user-role/' + resultRole?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataRole));
  });

  it('Get one [GET /api/user-role/permission]', async () => {
    await request(BaseTest.server)
      .get('/api/user-role/permission')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  });

  it('Update one [PUT /api/user-role/:id]', async () => {
    dataUpdateRole = await factoryManager.get(UserRole).make({code: resultRole?.code});

    const { body } = await request(BaseTest.server)
      .put('/api/user-role/' + resultRole?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateRole)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdateRole));
  });

  it('Update one [PUT /api/user-role/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/user-role/' + resultRole?.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send()
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type)
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultRole?.isDisabled }),
      );
  });

  // // User: 6 api test

  it('Create [POST /api/user]', async () => {
    data = await factoryManager.get(User).make({ roleCode: resultRole?.code });


    const { body } = await request(BaseTest.server)
      .post('/api/user')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send({
        ...data,
        retypedPassword: Example.password,
      })
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      body.data.dob = new Date(body.data.dob);
      body.data.startDate = new Date(body.data.startDate);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...testData } = data;
      expect(body.data).toEqual(jasmine.objectContaining(testData));
      result = body.data;
    }
  });

  it('Get all [GET /api/user]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/user')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { position, role, ...testData } = body.data[0];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...testData2 } = data;
      testData.dob = new Date(testData.dob);
      testData.startDate = new Date(testData.startDate);
      expect(testData).toEqual(jasmine.objectContaining(testData2));
    }
  });

  it('Get one [GET /api/user/:id]', async () => {
    if (!type) result = await BaseTest.moduleFixture!.get(UserService).create({...data, retypedPassword: data.password!});
    const { body } = await request(BaseTest.server)
      .get('/api/user/' + result?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { position, role, ...testData } = body.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...testData2 } = data;
      testData.dob = new Date(testData.dob);
      testData.startDate = new Date(testData.startDate);
      expect(testData).toEqual(jasmine.objectContaining(testData2));
    }
  });

  it('Update one [PUT /api/user/:id]', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...test } = await factoryManager.get(User).make({ roleCode: resultRole?.code });
    dataUpdate = test;
    const { body } = await request(BaseTest.server)
      .put('/api/user/' + result?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      body.data.dob = new Date(body.data.dob);
      body.data.startDate = new Date(body.data.startDate);
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Update one [PUT /api/user/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/user/' + result?.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send()
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type)
      expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result?.isDisabled }));
  });

  it('Delete one [DELETE /api/user/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/user/' + result?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      body.data.dob = new Date(body.data.dob);
      body.data.startDate = new Date(body.data.startDate);
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Delete one [DELETE /api/user-role/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/user-role/' + resultRole?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdateRole));
  });

  return afterAll(BaseTest.initAfterAll);
};
