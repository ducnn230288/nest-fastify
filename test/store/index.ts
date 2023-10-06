import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { CreateStoreRequestDto, UpdateStoreRequestDto } from '@dto';
import { StoreProduct } from '@model';

import { BaseTest } from '../base';

export const testCase = (type?: string, permissions: string[] = []) => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataStore: CreateStoreRequestDto = {
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    status: 0,
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
    // userId: faker.string.uuid(),
  };
  const dataUpdate: UpdateStoreRequestDto = {
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    status: 0,
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
  };
  let resultStore: StoreProduct = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
    // userId: dataStore.userId,
    status: 0,
  };

  it('Create [POST /api/store]', async () => {
    // let userId = '';
    // switch (type) {
    //   case 'Admin':
    //     userId = BaseTest.userAdmin.id;
    //     break;
    //   case 'Role':
    //     userId = BaseTest.userRole.id;
    //     break;
    //   default:
    //     userId = BaseTest.user.id;
    // }
    // dataStore.userId = userId;
    const { body } = await request(BaseTest.server)
      .post('/api/store')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataStore)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataStore));
      resultStore = body.data;
    }
  });

  it('Get [GET /api/store]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/store')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(dataStore));
    }
  });

  it('Get [GET /api/store/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/store/' + resultStore.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataStore));
    }
  });

  it('Update [PUT /api/store/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/store/' + resultStore.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Update one [PUT /api/store/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/store/' + resultStore!.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultStore!.isDisabled }),
      );
    }
  });

  it('Delete [DELETE /api/store/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/store/' + resultStore.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
