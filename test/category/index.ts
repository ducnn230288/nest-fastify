import { prefixRouter } from "@shared";
import { BaseTest } from "@test";
import { CreateCategoryRequestDto } from "src/module/category/dto";
import { useSeederFactoryManager } from "typeorm-extension";
import request from 'supertest';
import { CreateDataRequestDto, CreateDataTypeRequestDto, UpdateDataRequestDto, UpdateDataTypeRequestDto } from "@dto";
import { Data, DataType, Category } from "@model";

import { HttpStatus } from "@nestjs/common";
const controller = '/category'
export const API = prefixRouter + controller;
export const testCase = (type?: string, permissions: string[] = []): void => {
    beforeAll(() => BaseTest.initBeforeAll(type, permissions));


    const factoryManager = useSeederFactoryManager();
    let dataCreate: CreateCategoryRequestDto
    let dataType: CreateDataTypeRequestDto;
    let dataUpdateType: UpdateDataTypeRequestDto;
    let resultType: DataType | null;

    let data: CreateDataRequestDto;
    let dataUpdate: UpdateDataRequestDto;
    let result: Data | null;

    it(`Create [POST ${API}]`, async () => {
        dataCreate = await factoryManager.get(Category).make();
        console.log('voooo');
        const { body } = await request(BaseTest.server)
            .post(API)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .send(dataCreate as CreateCategoryRequestDto)
            .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
            if (type) {
                expect(body.data).toEqual(jasmine.objectContaining(dataType));
                resultType = body.data;
            }
    });
    return afterAll(BaseTest.initAfterAll);
    
};