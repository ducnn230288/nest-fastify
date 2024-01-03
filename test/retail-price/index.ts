import { prefixRouter } from '@shared';
import { BaseTest } from '@test';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { CreateRetailPriceDto } from 'src/module/retail-price/dto/create-retail-price.dto';
import { RetailPrice } from 'src/module/retail-price/model/retail-price.model';
import { useSeederFactoryManager } from 'typeorm-extension';

const controller = '/retail-price';
export const API = prefixRouter + controller;

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  const factoryManager = useSeederFactoryManager();

  let dataCreate: CreateRetailPriceDto;
  it(`Create [Post ${API}]`, async () => {
    dataCreate = await factoryManager.get(RetailPrice).make();
    const { body } = await request(BaseTest.server)
      .post(API)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataCreate as CreateRetailPriceDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
  });
};
