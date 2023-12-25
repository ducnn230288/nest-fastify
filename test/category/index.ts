import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { Category } from '@model';
import { CreateCategoryRequestDto, DetailCategoryResponeDto } from '@dto';
import '@factories';
import { BaseTest } from '@test';
import { prefixRouter } from '@shared';
import { CategoryService } from '@service';

const controller = '/category';
export const API = prefixRouter + controller;

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();


  let dataCreate: CreateCategoryRequestDto
  let resultCategory: Category | null
  let categoryUpdate;
  it(`Create [POST ${API}]`, async () => {
    dataCreate = await factoryManager.get(Category).make();
    if(dataCreate.parentId){
      await BaseTest.moduleFixture!.get(CategoryService).create({id:dataCreate.parentId,name:"aaa"});
    }
   // resultCategory = await factoryManager.get(Category).make();
    const { body } = await request(BaseTest.server)
      .post(API)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataCreate as CreateCategoryRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(await dataCreate));
      resultCategory = body.data;
    }
  });

  // it(`Get one [GET ${API}/:id ]`, async () => {
  //   if (!type) {
  //     resultCategory = await BaseTest.moduleFixture!.get(CategoryService).create(dataCreate);
  //   }
  //   const { body } = await request(BaseTest.server)
  //     .get(API + '/' + resultCategory?.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //     if (type) {
  //       expect(body.data).toEqual(jasmine.objectContaining(resultCategory));
  //     }
  // });
  // it(`Get all [GET ${API}/findAll]`, async () => {
  //   if (!type) {
  //     resultCategory = await BaseTest.moduleFixture!.get(CategoryService).create(dataCreate);
  //   }
  //   const { body } = await request(BaseTest.server)
  //     .get(`${API}/findAll`)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN)
  //     if (type) {
  //     expect(body.data[0]).toEqual(jasmine.objectContaining(resultCategory));
    
  //   }
  // });


  // it(`Update Category [PUT ${API}/:id`, async () => {
  //   console.log("vô");
    
  //   categoryUpdate = await factoryManager.get(Category).make();
  //  // resultCategory= await BaseTest.moduleFixture!.get(CategoryService).create(categoryUpdate)
  //   console.log("categoryUpdate",categoryUpdate);
  //   console.log("resultCategory",resultCategory);
    
    
  //   const { body } = await request(BaseTest.server)
  //     .put(API + "/" + resultCategory?.id+"?name=" +categoryUpdate?.name)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .send({name:categoryUpdate.name})
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //     console.log(body);
      
  //   if (type) {
  //     expect(body.data).toEqual(jasmine.objectContaining({name:categoryUpdate.name}));
  //     resultCategory = body.data;
  //   }
  // });


  // it(`Delete [DELETE ${API}/:id]`, async () => {
  //   const { body } = await request(BaseTest.server)
  //     .delete(API + '/' + resultCategory?.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   if (type) {
  //     const { updatedAt, isDisabled, isDeleted, ...test } = resultCategory!;
  //     expect(body.data).toEqual(jasmine.objectContaining(test));
  //   }
  // });


  return afterAll(BaseTest.initAfterAll);
};
