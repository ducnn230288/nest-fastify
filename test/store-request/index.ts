import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { Category, StoreRequest } from '@model';
import { CreateCategoryRequestDto, CreateCodeRequestDto, CreateStoreRequestDto, DetailCategoryResponeDto, RejectStoreRequestDto } from '@dto';
import '@factories';
import { BaseTest } from '@test';
import { prefixRouter } from '@shared';
import { CategoryService } from '@service';

const controller = '/store-request';
export const API = prefixRouter + controller;

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();


  let dataCreate
  let result: StoreRequest | null
  let dataReject: RejectStoreRequestDto | null


  it(`Create [POST ${API}]`, async () => {
    dataCreate = await factoryManager.get(StoreRequest).make();

    dataCreate = {
      productName: dataCreate.productName,
      description: dataCreate.description,
      note: dataCreate.note,
      approvedAt : new Date(),
    }

    const { body } = await request(BaseTest.server)
      .post(API)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataCreate )
      // .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

      console.log(body);
      

    // if (type) {
    //   expect(body.data).toEqual(jasm1ine.objectContaining(dataCreate));
    //   result = body.data;
    // }
  });

  // it(`Get one [GET ${API}/:id ]`, async () => {
  //   const { body } = await request(BaseTest.server)
  //     .get(API + '/' + result?.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   if (type) {
  //     expect(body.data).toEqual(jasmine.objectContaining(result));
  //   }
  // });

  it(`Get all [GET ${API}]`, async () => {
    const { body } = await request(BaseTest.server)
      .get(API)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      // .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN)

      console.log(body.data);
      

    // if (type) {
    //   expect(body.data[0]).toEqual(jasmine.objectContaining(result));
    // }
  });


  // it(`Update Category [PUT ${API}/reject/:id`, async () => {
  //   dataReject = await factoryManager.get(StoreRequest).make();

  //   dataReject = {
  //     note : dataReject.note,
  //     reason : dataReject.reason
  //   }

  //   const { body } = await request(BaseTest.server)
  //     .put(API + "/reject/" + result?.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .send(dataReject as RejectStoreRequestDto)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

  //     if (type) {
  //       expect(body.data).toEqual(jasmine.objectContaining(dataReject));
  //     }
  // });

  // it(`Update Category [PUT ${API}/accept/:id`, async () => {
  //   const { body } = await request(BaseTest.server)
  //     .put(API + "/accept/" + result?.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .send()
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

  //   if (type) {
  //     expect(body.data).toEqual(jasmine.objectContaining(dataCreate));
  //   }
  // });

  return afterAll(BaseTest.initAfterAll);
};
