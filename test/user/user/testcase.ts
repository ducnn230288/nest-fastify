import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { Address, District, Province, User, UserRole, Ward } from '@model';
import {
    CreateUserRoleRequestDto,
    UpdateUserRoleRequestDto,
    UpdateUserRequestDto,
    CreateAddressRequestDto,
    UpdateAddressRequestDto,
} from '@dto';
import { DistrictService, P_USER_CREATE, ProvinceService, UserRoleService, UserService, WardService } from '@service';
import { Example } from '@shared';
import '@factories';
import { BaseTest } from '@test';
import { randomUUID } from 'crypto';

export const testCase = (type?: string, permissions: string[] = []): void => {
    beforeAll(() => BaseTest.initBeforeAll(type, permissions));
    const factoryManager = useSeederFactoryManager();

    let dataRole: CreateUserRoleRequestDto;
    let dataUpdateRole: UpdateUserRoleRequestDto;
    let resultRole: UserRole | null;

    let data: User;
    let dataUpdate: UpdateUserRequestDto;
    let result: User | null;

    let dataAddress: CreateAddressRequestDto;
    let province;
    let district;
    let ward;
    let dataAddressUpdate: UpdateAddressRequestDto;
    let resultAddress: Address | null;

    it('Create new Account [POST /api/user]', async () => {
        data = await factoryManager.get(User).make();

        const testData = {
            ...data,
            retypedPassword: data.password
        }

        const { body } = await request(BaseTest.server)
            .post('/api/user')
            .send(testData)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(HttpStatus.CREATED);

        result = body.data;
    })

    it('Get All [GET /api/user]', async () => {
        const { body } = await request(BaseTest.server)
            .get('/api/user')
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(HttpStatus.OK);

        const { password, ...testDate2 } = data;

        body.data[0].dob = new Date(body.data[0].dob);
        body.data[0].startDate = new Date(body.data[0].startDate);

        expect(body.data[0]).toEqual(jasmine.objectContaining(testDate2));
    })

    it('Create new User with blank all field [POST /api/user]', async () => {
        const testData = {}

        const { body } = await request(BaseTest.server)
            .post('/api/user')
            .send(testData)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(HttpStatus.BAD_REQUEST);

        const message = [
            'retypedPassword must be longer than or equal to 6 characters',
            'name must be a string',
            'email must be an email',
            'phoneNumber must be shorter than or equal to 12 characters',
            'phoneNumber must be longer than or equal to 8 characters',
            'phoneNumber must be a string',
            'dob must be a valid ISO 8601 date string',
            'startDate must be a valid ISO 8601 date string'
        ]

        expect(body.message).toEqual(jasmine.objectContaining(message));
    })

    it('Create User with email existed [POST /api/user]', async () => {
        const testData = await factoryManager.get(User).make({ email: data.email })
        const test = {
            ...testData,
            password: Example.password,
            retypedPassword: Example.password
        }

        const { body } = await request(BaseTest.server)
            .post('/api/user')
            .send(test)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(HttpStatus.BAD_REQUEST);

        expect(body.message).toEqual('Email này đã được sử dụng');
    });

    it('Get one User [GET /api/user/:id]', async () => {
        const { body } = await request(BaseTest.server)
            .get('/api/user/' + result?.id)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(HttpStatus.OK);

        body.data.dob = new Date(body.data.dob);
        body.data.startDate = new Date(body.data.startDate);

        const { password, ...testData } = data;

        expect(body.data).toEqual(jasmine.objectContaining(testData));
    })

    it('Get one User not exist [GET /api/user/:id]', async () => {
        const testId = randomUUID();

        const { body } = await request(BaseTest.server)
            .get('/api/user/' + testId)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(HttpStatus.BAD_REQUEST);

        expect(body.message).toEqual(`Dữ liệu ${testId} không tồn tại`);
    });

    it('Update user [PUT /api/user/:id]', async () => {
        const testRole = await factoryManager.get(UserRole).make({
            permissions: [
                'ac0c4f13-776d-4b71-be4d-f9952734a319'
            ]
        })
        await request(BaseTest.server).post('/api/user-role')
            .send(testRole)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(HttpStatus.CREATED);

        const testData = await factoryManager.get(User).make({ roleCode: testRole.code });
        const { password, ...test } = testData;

        const { body } = await request(BaseTest.server)
            .put('/api/user/' + result?.id)
            .send(test)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(HttpStatus.OK);

        body.data.dob = new Date (body.data.dob);
        body.data.startDate = new Date (body.data.startDate);

        expect(body.data).toEqual(jasmine.objectContaining(test));
    })

    return afterAll(BaseTest.initAfterAll);
}