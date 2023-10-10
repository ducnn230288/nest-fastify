import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import {
  CreateProductCategoryRequestDto,
  CreateProductRequestDto,
  ProductCategoryDto,
  ProductCreateStoreRequestDto,
  ProductUpdateStoreRequestDto,
  UpdateProductCategoryRequestDto,
  UpdateProductRequestDto,
} from '@dto';

import { BaseTest } from '@test';
import { ProductCategory, Product, ProductStore, Data } from '@model';
import { ProductCategoryService, ProductService, ProductStoreService } from '@service';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataProductStore: ProductCreateStoreRequestDto = {
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    status: 0,
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
  };

  const dataProductStoreUpdate: ProductUpdateStoreRequestDto = {
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    status: 0,
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
  };

  let resultProductStore: ProductStore = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
    status: 0,
  };

  const dataProductCategory: CreateProductCategoryRequestDto = {
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

  const dataProductCategoryUpdate: UpdateProductCategoryRequestDto = {
    name: 'thien 123456789',
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
  };

  const dataProduct: CreateProductRequestDto = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    quantity: faker.number.int({ max: 100 }),
    price: faker.number.int({ min: 0, max: 100000000 }),
    images: faker.image.url(),
    slug: faker.lorem.slug(),
    mass: faker.number.int({ min: 0, max: 100 }),
    productCategoryId: faker.string.uuid() || '',
    productStoreId: faker.string.uuid() || '',
  };

  let resultProduct: Product | null = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    quantity: faker.number.int({ max: 100 }),
    price: faker.number.int({ min: 0, max: 100000000 }),
    images: faker.image.url(),
    slug: faker.lorem.slug(),
    mass: faker.number.int({ min: 0, max: 100 }),
    productStoreId: faker.string.uuid() || '',
    productCategoryId: faker.string.uuid() || '',
    discount: 0,
  };

  const dataProductUpdate: UpdateProductRequestDto = {
    name: faker.person.fullName(),
    description: faker.lorem.paragraph(),
    quantity: faker.number.int({ max: 100 }),
    price: faker.number.int({ min: 0, max: 100000000 }),
    images: faker.image.url(),
    slug: faker.lorem.slug(),
    mass: faker.number.int({ min: 0, max: 100 }),
  };

  //Test store 5 API

  it('Create [POST /api/product-store]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/product-store')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProductStore)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductStore));
      resultProductStore = body.data;
    }
  });

  it('Get [GET /api/product-store]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product-store')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(dataProductStore));
    }
  });

  it('Get [GET /api/product-store/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product-store/' + resultProductStore.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductStore));
    }
  });

  it('Update [PUT /api/product-store/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/product-store/' + resultProductStore.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProductStoreUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductStoreUpdate));
    }
  });

  it('Update one [PUT /api/product-store/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/product-store/' + resultProductStore!.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultProductStore!.isDisabled }),
      );
    }
  });

  //Test category 5 API

  it('Create [POST /api/product-category]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/product-category')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProductCategory)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductCategory));
      resultProductCategory = body.data;
    }
  });

  it('Get all [GET /api/product-category]', async () => {
    if (!type) {
      resultProductCategory = await BaseTest.moduleFixture!.get(ProductCategoryService).create(dataProductCategory);
    }

    const { body } = await request(BaseTest.server).get('/api/product-category').expect(HttpStatus.OK);
    expect(body.data[0]).toEqual(jasmine.objectContaining(dataProductCategory));
  });

  it('Get one [GET /api/product-category/slug/:slug]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product-category/slug/' + resultProductCategory?.slug)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductCategory));
    }
  });

  it('Get One [GET /api/product-category/:id', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product-category/' + resultProductCategory?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductCategory));
    }
  });

  it('Update ProductCategory [PUT /api/product-category/:id', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/product-category/' + resultProductCategory?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProductCategoryUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    // const { name, ...test } = dataUpdate;
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductCategoryUpdate));
    }
  });

  it('Update One [PUT  /api/product-category/:id/disable/:boolean', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/product-category/' + resultProductCategory?.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultProductCategory!.isDisabled }),
      );
    }
  });

  //Test product 5 API

  it('Create [POST api/product]', async () => {
    dataProduct.productCategoryId = resultProductCategory?.id || '';
    dataProduct.productStoreId = resultProductStore?.id;

    const { body } = await request(BaseTest.server)
      .post('/api/product')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProduct)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProduct));
      resultProduct = body.data;
    }
    console.log(resultProduct);
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
      .get('/api/product/slug/' + resultProduct?.slug)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProduct));
    }
  });

  it('GET [GET api/product/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product/' + resultProduct?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProduct));
    }
  });

  it('Update Product [PUT /api/product/:id', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/product/' + resultProduct?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProductUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    // const { name, ...test } = dataProductUpdate;
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductUpdate));
    }
  });

  it('Update One [PUT /api/product/:id/disable/:boolean', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/product/' + resultProduct?.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultProduct!.isDisabled }),
      );
    }
  });

  //Test order

  // Test api delete order, product, product-category, product-store
  it('Detete [DELETE /api/product/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/product/' + resultProduct?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductUpdate));
    }
  });

  it('Detete [DELETE /api/product-category/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/product-category/' + resultProductCategory?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductCategoryUpdate));
    }
  });

  it('Delete [DELETE /api/product-store/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/product-store/' + resultProductStore.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductStoreUpdate));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
