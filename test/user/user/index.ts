import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { Example } from '@shared';
import { CreateUserRoleRequestDto, UpdateUserRoleRequestDto, CreateUserRequestDto, UpdateUserRequestDto } from '@dto';
import { User, UserRole } from '@model';
import { P_USER_CREATE, P_USER_UPDATE } from '@service';

import { BaseTest } from '@test';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataRole: CreateUserRoleRequestDto = {
    name: faker.person.jobType(),
    code: faker.string.alpha(),
    isSystemAdmin: true,
    permissions: [P_USER_CREATE],
  };
  const dataUpdateRole: UpdateUserRoleRequestDto = {
    name: faker.person.jobType(),
    isSystemAdmin: false,
    permissions: [P_USER_UPDATE],
  };
  let resultRole: UserRole = {
    id: faker.string.uuid(),
    code: faker.string.alpha(),
    name: faker.person.jobType(),
    isSystemAdmin: false,
    permissions: [],
  };

  const data: CreateUserRequestDto = {
    avatar: faker.image.url(),
    name: faker.person.fullName(),
    password: Example.password,
    retypedPassword: Example.password,
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number('0#########'),
    dob: faker.date.birthdate(),
    description: faker.lorem.paragraph(),
    startDate: faker.date.past(),
    roleCode: resultRole.code,
    dateLeave: faker.number.int({ min: 0.5, max: 12 }),
  };

  const dataUpdate: UpdateUserRequestDto = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number('0#########'),
    dob: faker.date.birthdate(),
    startDate: faker.date.past(),
    description: faker.lorem.paragraph(),
    avatar: faker.image.url(),
    roleCode: resultRole.code,
  };

  let result: User = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number('0#########'),
    dob: faker.date.birthdate(),
    startDate: faker.date.past(),
    positionCode: 'DEV',
    description: faker.lorem.paragraph(),
    avatar: faker.image.url(),
    dateLeave: faker.number.int({ min: 0.5, max: 12 }),
    dateOff: faker.number.int({ min: 0.5, max: 12 }),
  };
  // User-role: 7 api test
  it('Create [POST /api/user-role/add]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/user-role/add')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataRole)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataRole));
      resultRole = body.data;
    }
  });

  it('Get all [GET /api/user-role/list]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/user-role/list')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(dataRole));
    }
  });

  it('Get one [GET /api/user-role/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/user-role/' + resultRole.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataRole));
    }
  });

  it('Get one [GET /api/user-role/permission]', async () => {
    await request(BaseTest.server)
      .get('/api/user-role/permission')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  });

  it('Update one [PUT /api/user-role/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/user-role/' + resultRole.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateRole)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateRole));
    }
  });

  it('Update one [PUT /api/user-role/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/user-role/' + resultRole.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send()
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultRole.isDisabled }),
      );
    }
  });

  // User: 6 api test

  it('Create [POST /api/user/add]', async () => {
    data.roleCode = resultRole.code;
    dataUpdate.roleCode = resultRole.code;
    const { body } = await request(BaseTest.server)
      .post('/api/user/add')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      body.data.dob = new Date(body.data.dob);
      body.data.startDate = new Date(body.data.startDate);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, retypedPassword, ...testData } = data;
      expect(body.data).toEqual(jasmine.objectContaining(testData));
      result = body.data;
    }
  });

  it('Get all [GET /api/user/list]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/user/list')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { position, role, ...testData } = body.data[0];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, retypedPassword, ...testData2 } = data;
      testData.dob = new Date(testData.dob);
      testData.startDate = new Date(testData.startDate);
      expect(testData).toEqual(jasmine.objectContaining(testData2));
    }
  });

  it('Get one [GET /api/user/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/user/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { position, role, ...testData } = body.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, retypedPassword, ...testData2 } = data;
      testData.dob = new Date(testData.dob);
      testData.startDate = new Date(testData.startDate);
      expect(testData).toEqual(jasmine.objectContaining(testData2));
    }
  });

  it('Update one [PUT /api/user/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/user/' + result.id)
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
      .put('/api/user/' + result.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send()
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result.isDisabled }));
    }
  });

  it('Delete one [DELETE /api/user/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/user/' + result.id)
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
      .delete('/api/user-role/' + resultRole.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateRole));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
