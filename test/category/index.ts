import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { CreateCategoryTypeRequestDto } from '@dto';

import { BaseTest } from '../base';
import { Category } from '@model';
import { CategoryService } from '@service';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataType: CreateCategoryTypeRequestDto = {
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

  it('Create [POST /api/category]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/category')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultType = body.data;
      // console.log(resultType);
    }
  });

  it('Get all [GET /api/category]', async () => {
    if (!type) {
      resultType = await BaseTest.moduleFixture!.get(CategoryService).create(dataType);
    }
    console.log(resultType);

    const { body } = await request(BaseTest.server).get('/api/category').expect(HttpStatus.OK);
    // console.log(body.data);
    expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  });

  it('Get one [GET /api/category/slug/:slug]', async () => {
    if (!type) {
      resultType = await BaseTest.moduleFixture!.get(CategoryService).create(dataType);
    }

    console.log(resultType.id);

    const { body } = await request(BaseTest.server)
      .get('/api/category/slug/' + resultType.slug)
      .expect(HttpStatus.OK);
    // if (type) {
    //   console.log(type);
    //   console.log(body);
    //   expect(body.data).toEqual(jasmine.objectContaining(dataType));
    // }
    expect(body.data).toEqual(jasmine.objectContaining(dataType));
  });

  return afterAll(BaseTest.initAfterAll);
};
