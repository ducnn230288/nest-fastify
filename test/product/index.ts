/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';

import {
  CreateAddressRequestDto,
  CreateOrderRequestDto,
  CreateProductCategoryRequestDto,
  CreateProductRequestDto,
  CreateUserRequestDto,
  CreateUserRoleRequestDto,
  OrderProductDto,
  ProductCreateStoreRequestDto,
  ProductUpdateStoreRequestDto,
  UpdateProductCategoryRequestDto,
  UpdateProductRequestDto,
} from '@dto';

import { BaseTest } from '@test';
import {
  ProductCategory,
  Product,
  ProductStore,
  UserRole,
  User,
  OrderProduct,
  AddressProvince,
  AddressWard,
  AddressDistrict,
  Order,
  Address,
} from '@model';
import {
  CATEGORY_CREATE,
  AddressDistrictService,
  PRODUCT_CREATE,
  P_USER_CREATE,
  ProductCategoryService,
  ProductService,
  ProductStoreService,
  AddressProvinceService,
  STORE_CREATE,
  UserRoleService,
  UserService,
  AddressWardService,
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

  let resultProductCategory: ProductCategory | null;
  let resultProductStore: ProductStore | null;
  let resultUser: User | null;
  let resultProduct: Product | null;
  let resultRole: UserRole | null;

  let dataProductCategoryUpdate;
  let dataProductStoreUpdate;
  let dataProductUpdate: UpdateProductRequestDto;

  let dataOrder: CreateOrderRequestDto;
  // let dataOrderProduct: OrderProductDto;

  let orderProduct: OrderProductDto;
  let province: AddressProvince | null;
  let district: AddressDistrict | null;
  let ward: AddressWard | null;
  let createAddressDto: CreateAddressRequestDto | null;
  let resultOrder: Order | null;

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
      dataProductStore = await factoryManager.get(ProductStore).make({ userId: resultUser?.id });
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
      expect(body.data).toEqual(jasmine.objectContaining(dataProduct));
      resultProduct = body.data;
    }
  });

  it('Get List [GET api/product]', async () => {
    if (!type) {
      dataProduct.productStoreId = resultProductStore?.id || '';
      dataProduct.productCategoryId = resultProductCategory?.id || '';
      resultProduct = await BaseTest.moduleFixture!.get(ProductService).create(dataProduct);
    }
    const { body } = await request(BaseTest.server).get('/api/product').expect(HttpStatus.OK);
    expect(body.data[0]).toEqual(jasmine.objectContaining(dataProduct));
  });

  it('Get by slug [GET api/product/slug/:slug]', async () => {
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

  it('Get [GET api/product/:id]', async () => {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { productCategoryId, productStoreId, ...test } = fakeData;
    dataProductUpdate = test;

    const { body } = await request(BaseTest.server)
      .put('/api/product/' + resultProduct?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataProductUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductUpdate));
      resultProduct = body.data;
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

  // Test api Order

  it('Create [POST /api/order]', async () => {
    // console.log(resultProduct);
    orderProduct = {
      name: resultProduct!.name,
      price: resultProduct!.price,
      discount: resultProduct!.discount,
      id: resultProduct!.id,
      productStoreId: resultProduct!.productStoreId,
      quantity: 3,
    };

    province = await BaseTest.moduleFixture!.get(AddressProvinceService).create(
      await factoryManager.get(AddressProvince).make(),
    );

    district = await BaseTest.moduleFixture!.get(AddressDistrictService).create(
      await factoryManager.get(AddressDistrict).make({
        codeProvince: province?.code,
      }),
    );

    ward = await BaseTest.moduleFixture!.get(AddressWardService).create(
      await factoryManager.get(AddressWard).make({
        codeDistrict: district?.code,
      }),
    );

    createAddressDto = await factoryManager.get(Address).make({
      codeProvince: province!.code,
      codeDistrict: district!.code,
      codeWard: ward!.code,
    });

    const res = await request(BaseTest.server)
      .post('/api/address')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(createAddressDto);

    const address = res.body.data;

    dataOrder = {
      products: [orderProduct],
      addressId: address.id,
      codeDistrict: district!.code,
      codeProvince: province!.code,
      codeWard: ward!.code,
      specificAddress: 'mai roi order ha',
      reason: 'dasjdaos',
    };

    const oldProduct = resultProduct;

    const { body } = await request(BaseTest.server)
      .post('/api/order')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataOrder)
      .expect(HttpStatus.CREATED || HttpStatus.FORBIDDEN);

    resultProduct = await BaseTest.moduleFixture!.get(ProductService).findOne(resultProduct!.id!);
    expect(resultProduct?.quantity).toEqual(oldProduct!.quantity - dataOrder.products[0].quantity);
    expect(body.message).toBeDefined();
  });

  it('GET List [GET api/order]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/order')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK || HttpStatus.FORBIDDEN);

    const { orderAddress, orderProducts, ...testData } = body.data[0];
    const { products, reason, ...testAddress } = dataOrder;
    const { id, productStoreId, ...testOrderProduct } = orderProduct;

    expect(orderAddress).toEqual(jasmine.objectContaining(testAddress));
    expect(orderProducts[0]).toEqual(jasmine.objectContaining(testOrderProduct));
    expect(testData).toEqual(jasmine.objectContaining({ reason, status: 0 }));

    resultOrder = body.data[0];
  });

  it('GET List of Store [GET api/order/store/:storeId]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/order/store/' + resultProductStore?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { orderAddress, orderProducts, ...testData } = body.data[0];
      const { products, reason, ...testAddress } = dataOrder;
      const { id, productStoreId, ...testOrderProduct } = orderProduct;

      expect(orderAddress).toEqual(jasmine.objectContaining(testAddress));
      expect(orderProducts[0]).toEqual(jasmine.objectContaining(testOrderProduct));
      expect(testData).toEqual(jasmine.objectContaining({ reason, status: 0 }));
      resultOrder = body.data[0];
    }
  });

  it('UPDATE status Order [GET api/order/store/:storeId]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/order/' + resultOrder?.id + '/' + resultOrder?.status + 1)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { orderProducts, orderAddress, updatedAt, status, ...test } = resultOrder!;
      // console.log(body);
      // console.log(test);
      expect(body.data).toEqual(jasmine.objectContaining(test));
      expect(body.data.status).toEqual(resultOrder!.status! + 1);
    }
  });

  // Test api delete order, product, product-category, product-store
  it('Delete [DELETE /api/order/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/order/' + resultOrder?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { updatedAt, isDisabled, isDeleted, status, ...test } = resultOrder!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  it('Detete [DELETE /api/product/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/product/' + resultProduct?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)

      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      // const { createdAt, updatedAt, isDisabled, ...test } = body.data;
      const { createdAt, updatedAt, isDisabled, isDeleted, status, productStore, productCategory, ...test } =
        resultProduct!;

      expect(body.data).toEqual(jasmine.objectContaining(test));
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

  it('Detete [DELETE /api/product-category/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/product-category/' + resultProductCategory?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataProductCategoryUpdate));
    }
  });
  /*
   */

  return afterAll(BaseTest.initAfterAll);
};
