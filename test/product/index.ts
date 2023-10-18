import request from 'supertest';
import { HttpStatus } from '@nestjs/common';

import {
  CreateProductCategoryRequestDto,
  CreateProductRequestDto,
  CreateUserRequestDto,
  CreateUserRoleRequestDto,
  ProductCreateStoreRequestDto,
  ProductUpdateStoreRequestDto,
  UpdateProductCategoryRequestDto,
  UpdateProductRequestDto,
} from '@dto';

import { BaseTest } from '@test';
import { ProductCategory, Product, ProductStore, UserRole, User } from '@model';
import {
  CATEGORY_CREATE,
  PRODUCT_CREATE,
  P_USER_CREATE,
  ProductCategoryService,
  ProductService,
  ProductStoreService,
  STORE_CREATE,
  UserRoleService,
  UserService,
} from '@service';
import { Example } from '@shared';
import { SeederFactoryManager, useSeederFactoryManager } from 'typeorm-extension';
import '@factories';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataRole;
  let dataUser;
  let dataProductStore;
  let dataProductCategory;
  let dataProduct;

  let resultProductCategory;
  let resultProductStore;
  let resultUser;
  let resultProduct;
  let resultRole: UserRole | null;

  let dataProductCategoryUpdate;
  let dataProductStoreUpdate;
  let dataProductUpdate: UpdateProductRequestDto;

  // const dataRole: CreateUserRoleRequestDto = {
  //   name: faker.person.jobType(),
  //   code: faker.string.alpha(),
  //   isSystemAdmin: true,
  //   permissions: [P_USER_CREATE, STORE_CREATE],
  // };
  /**
  let resultRole: UserRole | null = {
    id: faker.string.uuid(),
    code: faker.string.alpha(),
    name: faker.person.jobType(),
    isSystemAdmin: true,
    permissions: [P_USER_CREATE, STORE_CREATE],
  };

  let resultUser: User | null = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phoneNumber: faker.phone.number(),
    dob: faker.date.birthdate(),
    startDate: faker.date.past(),
    positionCode: 'DEV',
    description: faker.lorem.paragraph(),
    avatar: faker.image.url(),
    dateLeave: faker.number.int({ min: 0.5, max: 12 }),
    dateOff: faker.number.int({ min: 0.5, max: 12 }),
  };

  const dataProductStoreUpdate: ProductUpdateStoreRequestDto = {
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    status: 0,
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
  };

  let resultProductStore: ProductStore | null = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    description: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    avatar: faker.image.url(),
    status: 0,
  };

  // let resultProductCategory: ProductCategory | null = {
  //   id: faker.string.uuid(),
  //   name: faker.person.fullName(),
  //   description: faker.lorem.paragraph(),
  //   slug: faker.lorem.slug(),
  // };

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
    id: faker.string.uuid(),
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
  */
  //Test category 5 API

  it('Create [POST /api/product-category]', async () => {
    dataProductCategory = await factoryManager.get(ProductCategory).make();
    resultProductCategory = await factoryManager.get(ProductCategory).make();
    const { body } = await request(BaseTest.server)
      .post('/api/product-category')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProductCategory)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(await dataProductCategory));
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
    if (!type) {
      resultProductCategory = await BaseTest.moduleFixture!.get(ProductCategoryService).create(dataProductCategory);
    }
    const { body } = await request(BaseTest.server)
      .get('/api/product-category/slug/' + resultProductCategory?.slug)
      .expect(HttpStatus.OK);
    expect(body.data).toEqual(jasmine.objectContaining(dataProductCategory));
  });

  it('Get One [GET /api/product-category/:id', async () => {
    if (!type) {
      resultProductCategory = await BaseTest.moduleFixture!.get(ProductCategoryService).create(dataProductCategory);
    }
    const { body } = await request(BaseTest.server)
      .get('/api/product-category/' + resultProductCategory?.id)
      .expect(HttpStatus.OK);

    expect(body.data).toEqual(jasmine.objectContaining(dataProductCategory));
  });

  it('Update ProductCategory [PUT /api/product-category/:id', async () => {
    dataProductCategoryUpdate = await factoryManager.get(ProductCategory).make();
    const { body } = await request(BaseTest.server)
      .put('/api/product-category/' + resultProductCategory?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProductCategoryUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductCategoryUpdate));
      resultProductCategory = body.data;
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

  //Test store 5 API

  it('Create [POST /api/product-store]', async () => {
    dataProductStore = await factoryManager.get(ProductStore).make();

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
    if (!type) {
      dataRole = await factoryManager
        .get(UserRole)
        .make({ permissions: [STORE_CREATE, PRODUCT_CREATE, CATEGORY_CREATE] });
      resultRole = await BaseTest.moduleFixture!.get(UserRoleService).create(dataRole);
      // dataUser = await factoryManager.get(User).make({ roleCode: resultRole?.code });
      const data = {
        ...(await factoryManager.get(User).make({ roleCode: resultRole?.code })),
        retypedPassword: Example.password,
      };
      resultUser = await BaseTest.moduleFixture!.get(UserService).create(data);
      dataProductStore = await factoryManager.get(ProductStore).make({ userId: resultUser.id });
      resultProductStore = await BaseTest.moduleFixture!.get(ProductStoreService).create(dataProductStore);
    }
    const { body } = await request(BaseTest.server).get('/api/product-store').expect(HttpStatus.OK);
    expect(body.data[0]).toEqual(jasmine.objectContaining(dataProductStore));
  });

  it('Get [GET /api/product-store/{id}]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/product-store/' + resultProductStore!.id)

      .expect(HttpStatus.OK);
    expect(body.data).toEqual(jasmine.objectContaining(dataProductStore));
  });

  it('Update [PUT /api/product-store/{id}]', async () => {
    dataProductStoreUpdate = await factoryManager.get(ProductStore).make();
    const { body } = await request(BaseTest.server)
      .put('/api/product-store/' + resultProductStore!.id)
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

  //Test product 5 API

  it('Create [POST api/product]', async () => {
    dataProduct = await factoryManager.get(Product).make();
    // resultProduct = await factoryManager.get(Product).make();

    dataProduct.productCategoryId = resultProductCategory?.id || '';
    dataProduct.productStoreId = resultProductStore?.id || '';

    const { body } = await request(BaseTest.server)
      .post('/api/product')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProduct)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(await dataProduct));
      resultProduct = body.data;
    }
  });

  it('GET List [GET api/product]', async () => {
    if (!type) {
      dataProduct.productStoreId = resultProductStore?.id || '';
      dataProduct.productCategoryId = resultProductCategory?.id || '';
      resultProduct = await BaseTest.moduleFixture!.get(ProductService).create(dataProduct);
    }
    const { body } = await request(BaseTest.server).get('/api/product').expect(HttpStatus.OK);
    expect(body.data[0]).toEqual(jasmine.objectContaining(dataProduct));
  });

  it('GET by slug [GET api/product/slug/:slug]', async () => {
    if (!type) {
      dataProduct.productStoreId = resultProductStore?.id || '';
      dataProduct.productCategoryId = resultProductCategory?.id || '';
      resultProduct = await BaseTest.moduleFixture!.get(ProductService).create(dataProduct);
    }
    const { body } = await request(BaseTest.server)
      .get('/api/product/slug/' + resultProduct?.slug)
      .expect(HttpStatus.OK);
    expect(body.data).toEqual(jasmine.objectContaining(dataProduct));
  });

  it('GET [GET api/product/:id]', async () => {
    if (!type) {
      dataProduct.productStoreId = resultProductStore?.id || '';
      dataProduct.productCategoryId = resultProductCategory?.id || '';
      resultProduct = await BaseTest.moduleFixture!.get(ProductService).create(dataProduct);
    }
    const { body } = await request(BaseTest.server)
      .get('/api/product/' + resultProduct?.id)
      .expect(HttpStatus.OK);

    expect(body.data).toEqual(jasmine.objectContaining(dataProduct));
  });

  it('Update Product [PUT /api/product/:id', async () => {
    const fakeData = await factoryManager.get(Product).make();

    const { productCategoryId, productStoreId, ...test } = fakeData;
    dataProductUpdate = test;
    const { body } = await request(BaseTest.server)
      .put('/api/product/' + resultProduct?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProductUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

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

  // Test api delete order, product, product-category, product-store

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
      .delete('/api/product-store/' + resultProductStore!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductStoreUpdate));
    }
  });

  it('Detete [DELETE /api/product/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/product/' + resultProduct?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)

      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductUpdate));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
