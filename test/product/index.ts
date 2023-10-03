import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { CreateCategoryTypeRequestDto, CreateProductTypeRequestDto, CreateStoreRequestDto } from '@dto';

import { BaseTest } from '../base';
import { Category, Product, Store } from '@model';
import { CategoryService, ProductService, StoreService } from '@service';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataCategory: CreateCategoryTypeRequestDto = {
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

  let resultStore: Store = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    status: 0,
    phone: faker.phone.number(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
  };

  const dataStore: CreateStoreRequestDto = {
    name: faker.person.fullName(),
    status: 0,
    phone: faker.phone.number(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
    userId: faker.string.uuid(),
  };

  const dataType: CreateProductTypeRequestDto = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    quantity: faker.number.int({ max: 100 }),
    price: faker.number.int({ min: 0, max: 100000000 }),
    images: faker.image.url(),
    slug: faker.lorem.slug(),
    mass: faker.number.int({ min: 0, max: 100 }),
    categoryId: faker.string.uuid() || '',
    storeId: faker.string.uuid() || '',
  };

  let resultType: Product = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    quantity: faker.number.int({ max: 100 }),
    price: faker.number.int({ min: 0, max: 100000000 }),
    images: faker.image.url(),
    slug: faker.lorem.slug(),
    mass: faker.number.int({ min: 0, max: 100 }),
    storeId: faker.string.uuid() || '',
    categoryId: faker.string.uuid() || '',
    disCount: 0,
  };

  it('Create [POST api/product]', async () => {
    let userId = '';
    switch (type) {
      case 'Admin':
        userId = BaseTest.userAdmin.id;
        break;
      case 'Role':
        userId = BaseTest.userRole.id;
        break;
      default:
        userId = BaseTest.user.id;
    }

    dataStore.userId = userId;
    resultStore = await BaseTest.moduleFixture!.get(StoreService).create(dataStore);
    resultCategory = await BaseTest.moduleFixture!.get(CategoryService).create(dataCategory);

    dataType.categoryId = resultCategory.id || '';
    dataType.storeId = resultStore.id || '';

    // console.log(dataType);

    const { body } = await request(BaseTest.server)
      .post('/api/product')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultType = body.data;
      // console.log(resultType);
    }
  });

  it('GET List [GET api/product]', async () => {
    if (!type) {
      resultType = await BaseTest.moduleFixture!.get(ProductService).create(dataType);
    }

    const { body } = await request(BaseTest.server).get('/api/product').expect(HttpStatus.OK);

    expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  });

  it('GET by slug [GET api/product/slug/:slug]', async () => {
    if (!type) {
      resultType = await BaseTest.moduleFixture!.get(ProductService).create(dataType);
    }

    const { body } = await request(BaseTest.server)
      .get('/api/product/slug/' + resultType.slug)
      .expect(HttpStatus.OK);

    expect(body.data).toEqual(jasmine.objectContaining(dataType));
  });

  return afterAll(BaseTest.initAfterAll);
};
