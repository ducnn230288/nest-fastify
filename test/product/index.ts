import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import {
  CreateCategoryProductRequestDto,
  CreateProductRequestDto,
  ProductCreateStoreRequestDto,
  UpdateProductRequestDto,
} from '@dto';

import { BaseTest } from '../base';
import { CategoryProduct, Product, ProductStore } from '@model';
import { CategoryProductService, ProductService, StoreService } from '@service';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataCategoryProduct: CreateCategoryProductRequestDto = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
  };

  let resultCategoryProduct: CategoryProduct = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
  };

  const dataStore: ProductCreateStoreRequestDto = {
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    status: 0,
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
    // userId: faker.string.uuid(),
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

  const dataProduct: CreateProductRequestDto = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    quantity: faker.number.int({ max: 100 }),
    price: faker.number.int({ min: 0, max: 100000000 }),
    images: faker.image.url(),
    slug: faker.lorem.slug(),
    mass: faker.number.int({ min: 0, max: 100 }),
    categoryProductId: faker.string.uuid() || '',
  };

  let resultProduct: Product = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    quantity: faker.number.int({ max: 100 }),
    price: faker.number.int({ min: 0, max: 100000000 }),
    images: faker.image.url(),
    slug: faker.lorem.slug(),
    mass: faker.number.int({ min: 0, max: 100 }),
    storeId: faker.string.uuid() || '',
    categoryProductId: faker.string.uuid() || '',
    discount: 0,
  };

  const dataUpdate: UpdateProductRequestDto = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    quantity: faker.number.int({ max: 100 }),
    price: faker.number.int({ min: 0, max: 100000000 }),
    images: faker.image.url(),
    slug: faker.lorem.slug(),
    mass: faker.number.int({ min: 0, max: 100 }),
  };

  it('Create [POST api/product]', async () => {
    resultCategoryProduct = await BaseTest.moduleFixture!.get(CategoryProductService).create(dataCategoryProduct);

    const res = await request(BaseTest.server)
      .get('/api/auth/profile')
      .set('Authorization', 'Bearer ' + BaseTest.token);

    const userId = res.body.data.id;

    resultStore = await BaseTest.moduleFixture!.get(StoreService).create({
      ...dataStore,
      userId: userId,
    });

    dataProduct.categoryProductId = resultCategoryProduct.id || '';

    const { body } = await request(BaseTest.server)
      .post('/api/product')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProduct)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProduct));
      resultProduct = body.data;
    }
  });

  it('GET List [GET api/product]', async () => {
    if (!type) {
      resultProduct = await BaseTest.moduleFixture!.get(ProductService).create(dataProduct);
    }

    const { body } = await request(BaseTest.server).get('/api/product').expect(HttpStatus.OK);

    expect(body.data[0]).toEqual(jasmine.objectContaining(dataProduct));
  });

  it('GET by slug [GET api/product/slug/:slug]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product/slug/' + resultProduct.slug)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProduct));
    }
  });

  it('GET [GET api/product/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product/' + resultProduct.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProduct));
    }
  });

  it('Update Product [PUT /api/product/:id', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/product/' + resultProduct.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    // const { name, ...test } = dataUpdate;
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Update One [PUT /api/product/:id/disable/:boolean', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/product/' + resultProduct.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultProduct!.isDisabled }),
      );
    }
  });

  it('Detete [DELETE /api/product/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/product/' + resultProduct.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
