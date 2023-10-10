import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { CreateProductCategoryRequestDto, UpdateProductCategoryRequestDto } from '@dto';

import { BaseTest } from '@test';
import { ProductCategory } from '@model';
import { ProductCategoryService } from '@service';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataType: CreateProductCategoryRequestDto = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
  };

  let resultProductCategory: ProductCategory | null = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
  };

  const dataUpdate: UpdateProductCategoryRequestDto = {
    name: 'thien 123456789',
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
  };

  it('Create [POST /api/category-product]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/category-product')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultProductCategory = body.data;
    }
  });

  it('Get all [GET /api/category-product]', async () => {
    if (!type) {
      resultProductCategory = await BaseTest.moduleFixture!.get(ProductCategoryService).create(dataType);
    }

    const { body } = await request(BaseTest.server).get('/api/category-product').expect(HttpStatus.OK);
    expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  });

  it('Get one [GET /api/category-product/slug/:slug]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/category-product/slug/' + resultProductCategory?.slug)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Get One [GET /api/category-product/:id', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/category-product/' + resultProductCategory?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Update ProductCategory [PUT /api/category-product/:id', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/category-product/' + resultProductCategory?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    // const { name, ...test } = dataUpdate;
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Update One [PUT  /api/category-product/:id/disable/:boolean', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/category-product/' + resultProductCategory?.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultProductCategory!.isDisabled }),
      );
    }
  });

  it('Detete [DELETE /api/category-product/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/category-product/' + resultProductCategory?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
