import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { CreateCategoryRequestDto, CreateProductRequestDto, UpdateProductRequestDto } from '@dto';

import { BaseTest } from '../base';
import { Category, Product } from '@model';
import { CategoryService, ProductService } from '@service';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataCategory: CreateCategoryRequestDto = {
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

  const dataType: CreateProductRequestDto = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    quantity: faker.number.int({ max: 100 }),
    price: faker.number.int({ min: 0, max: 100000000 }),
    images: faker.image.url(),
    slug: faker.lorem.slug(),
    mass: faker.number.int({ min: 0, max: 100 }),
    categoryId: faker.string.uuid() || '',
    // storeId: faker.string.uuid() || '',
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
    categoryId: faker.string.uuid() || '',
    disCount: 0,
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
    resultCategory = await BaseTest.moduleFixture!.get(CategoryService).create(dataCategory);

    dataType.categoryId = resultCategory.id || '';

    const { body } = await request(BaseTest.server)
      .post('/api/product')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultProduct = body.data;
    }
  });

  it('GET List [GET api/product]', async () => {
    if (!type) {
      resultProduct = await BaseTest.moduleFixture!.get(ProductService).create(dataType);
    }

    const { body } = await request(BaseTest.server).get('/api/product').expect(HttpStatus.OK);

    expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  });

  it('GET by slug [GET api/product/slug/:slug]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product/slug/' + resultProduct.slug)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('GET [GET api/product/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product/' + resultProduct.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
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
