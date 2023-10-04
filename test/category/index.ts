import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { CreateCategoryRequestDto, UpdateCategoryRequestDto } from '@dto';

import { BaseTest } from '../base';
import { Category } from '@model';
import { CategoryService } from '@service';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataType: CreateCategoryRequestDto = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
  };

  let resultCategory: Category = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
  };

  const dataUpdate: UpdateCategoryRequestDto = {
    name: 'thien 123456789',
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
  };

  it('Create [POST /api/category]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/category')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultCategory = body.data;
    }
  });

  it('Get all [GET /api/category]', async () => {
    if (!type) {
      resultCategory = await BaseTest.moduleFixture!.get(CategoryService).create(dataType);
    }

    const { body } = await request(BaseTest.server).get('/api/category').expect(HttpStatus.OK);
    expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  });

  it('Get one [GET /api/category/slug/:slug]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/category/slug/' + resultCategory.slug)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Get One [GET /api/category/:id', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/category/' + resultCategory.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Update Category [PUT /api/category/:id', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/category/' + resultCategory.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    // const { name, ...test } = dataUpdate;
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Update One [PUT  /api/category/:id/disable/:boolean', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/category/' + resultCategory.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultCategory!.isDisabled }),
      );
    }
  });

  it('Detete [DELETE /api/category/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/category/' + resultCategory.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
