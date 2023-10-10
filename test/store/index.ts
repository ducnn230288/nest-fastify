import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { ProductCreateStoreRequestDto, ProductUpdateStoreRequestDto } from '@dto';
import { ProductStore } from '@model';

import { BaseTest } from '@test';

export const testCase = (type?: string, permissions: string[] = []) => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataStore: ProductCreateStoreRequestDto = {
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    status: 0,
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
    // userId: faker.string.uuid(),
  };
  const dataUpdate: ProductUpdateStoreRequestDto = {
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    status: 0,
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
  };
  let resultStore: ProductStore = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
    // userId: dataStore.userId,
    status: 0,
  };

  it('Create [POST /api/product-store]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/product-store')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataStore)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataStore));
      resultStore = body.data;
    }
  });

  it('Get [GET /api/product-store]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product-store')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(dataStore));
    }
  });

  it('Get [GET /api/product-store/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product-store/' + resultStore.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataStore));
    }
  });

  it('Update [PUT /api/product-store/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/product-store/' + resultStore.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Update one [PUT /api/product-store/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/product-store/' + resultStore!.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultStore!.isDisabled }),
      );
    }
  });

  it('Delete [DELETE /api/product-store/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/product-store/' + resultStore.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
