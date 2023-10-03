import request from 'supertest';
import { faker } from '@faker-js/faker';
import { ExecutionContext, HttpStatus } from '@nestjs/common';

import { CreateCategoryRequestDto, UpdateCategoryRequestDto } from '@dto';

import { BaseTest } from '../base';
import { Category } from '@model';
import { CategoryService } from '@service';
import c from 'config';
import { http } from 'winston';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataType: CreateCategoryRequestDto = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
  };

  let resultType: Category = {
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
      resultType = body.data;
    }
  });

  // it('Get all [GET /api/category]', async () => {
  //   if (!type) {
  //     resultType = await BaseTest.moduleFixture!.get(CategoryService).create(dataType);
  //   }
  //   // console.log(resultType);

  //   const { body } = await request(BaseTest.server).get('/api/category').expect(HttpStatus.OK);
  //   // console.log(body.data);
  //   expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  // });

  // it('Get one [GET /api/category/slug/:slug]', async () => {
  //   if (!type) {
  //     resultType = await BaseTest.moduleFixture!.get(CategoryService).create(dataType);
  //   }

  //   // console.log(resultType.id);

  //   const { body } = await request(BaseTest.server)
  //     .get('/api/category/slug/' + resultType.slug)
  //     .expect(HttpStatus.OK);
  //   // if (type) {
  //   //   console.log(type);
  //   //   console.log(body);
  //   //   expect(body.data).toEqual(jasmine.objectContaining(dataType));
  //   // }
  //   expect(body.data).toEqual(jasmine.objectContaining(dataType));
  // });

  // it('Get One [GET /api/category/:id', async () => {
  //   if (!type) {
  //     resultType = await BaseTest.moduleFixture!.get(CategoryService).create(dataType);
  //   }

  //   const { body } = await request(BaseTest.server)
  //     .get('/api/category/' + resultType.id)
  //     .expect(HttpStatus.OK);

  //   expect(body.data).toEqual(jasmine.objectContaining(dataType));
  // });

  it('Update Category [PUT /api/category/:id', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/category/' + resultType.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    // console.log(body.data);
    // console.log(resultType.id);
    // console.log(dataUpdate);
    // const { name, ...test } = dataUpdate;
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
