import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { Address, AddressDistrict, AddressProvince, User, UserRole, AddressWard } from '@model';
import {
  CreateUserRoleRequestDto,
  UpdateUserRoleRequestDto,
  UpdateUserRequestDto,
  CreateAddressRequestDto,
  UpdateAddressRequestDto,
} from '@dto';
import {
  AddressDistrictService,
  P_USER_CREATE,
  AddressProvinceService,
  UserRoleService,
  UserService,
  AddressWardService,
} from '@service';
import { Example } from '@shared';
import '@factories';
import { BaseTest } from '@test';

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

  // user/role: 7 api test
  it('Create [POST /api/user/role]', async () => {
    dataRole = await factoryManager.get(UserRole).make({ permissions: [P_USER_CREATE] });

    const { body } = await request(BaseTest.server)
      .post('/api/user/role')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataRole)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataRole));
      resultRole = body.data;
    }
  });

  it('Get all [GET /api/user/role]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/user/role?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data[0]).toEqual(jasmine.objectContaining(dataRole));
  });

  it('Get one [GET /api/user/role/:id]', async () => {
    if (!type) resultRole = await BaseTest.moduleFixture!.get(UserRoleService).create(dataRole);
    const { body } = await request(BaseTest.server)
      .get('/api/user/role/' + resultRole?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataRole));
  });

  it('Get one [GET /api/user/role/permission]', async () => {
    await request(BaseTest.server)
      .get('/api/user/role/permission?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  });

  it('Update one [PUT /api/user/role/:id]', async () => {
    dataUpdateRole = await factoryManager.get(UserRole).make({ code: resultRole?.code });

    const { body } = await request(BaseTest.server)
      .put('/api/user/role/' + resultRole?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateRole)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdateRole));
  });

  it('Update disable [PUT /api/user/role/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/user/role/' + resultRole?.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send()
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type)
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultRole?.isDisabled }),
      );
  });

  // // User: 6 api test

  it('Create [POST /api/user]', async () => {
    data = await factoryManager.get(User).make({ roleCode: resultRole?.code });

    const { body } = await request(BaseTest.server)
      .post('/api/user')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send({
        ...data,
        retypedPassword: Example.password,
      })
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      body.data.dob = new Date(body.data.dob);
      body.data.startDate = new Date(body.data.startDate);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...testData } = data;
      expect(body.data).toEqual(jasmine.objectContaining(testData));
      result = body.data;
    }
  });

  it('Get all [GET /api/user]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/user?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { position, role, ...testData } = body.data[0];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...testData2 } = data;
      testData.dob = new Date(testData.dob);
      testData.startDate = new Date(testData.startDate);
      expect(testData).toEqual(jasmine.objectContaining(testData2));
    }
  });

  it('Get one [GET /api/user/:id]', async () => {
    if (!type)
      result = await BaseTest.moduleFixture!.get(UserService).create({ ...data, retypedPassword: data.password! });
    const { body } = await request(BaseTest.server)
      .get('/api/user/' + result?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { position, role, ...testData } = body.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...testData2 } = data;
      testData.dob = new Date(testData.dob);
      testData.startDate = new Date(testData.startDate);
      expect(testData).toEqual(jasmine.objectContaining(testData2));
    }
  });

  it('Update one [PUT /api/user/:id]', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...test } = await factoryManager.get(User).make({ roleCode: resultRole?.code });
    dataUpdate = test;

    const { body } = await request(BaseTest.server)
      .put('/api/user/' + result?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send({ ...dataUpdate, dateOff: '3' })
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      body.data.dob = new Date(body.data.dob);
      body.data.startDate = new Date(body.data.startDate);
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Update disable [PUT /api/user/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/user/' + result?.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send()
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type)
      expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result?.isDisabled }));
  });

  // test address
  it('Create [CREATE /api/address]', async () => {
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

    dataAddress = await factoryManager.get(Address).make({
      codeProvince: province!.code,
      codeDistrict: district!.code,
      codeWard: ward!.code,
    });

    const { body } = await request(BaseTest.server)
      .post('/api/address')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataAddress)
      .expect(HttpStatus.CREATED);

    expect(body.data).toEqual(jasmine.objectContaining(dataAddress));
    resultAddress = body.data;
  });

  it('Get all [GET /api/address]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/address?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    expect(body.data[0]).toEqual(jasmine.objectContaining(dataAddress));
  });

  it('Get one [GET /api/address/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/address/' + resultAddress!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    expect(body.data).toEqual(jasmine.objectContaining(dataAddress));
  });

  it('Update [PUT /api/address/:id]', async () => {
    dataAddressUpdate = await factoryManager.get(Address).make();
    const { body } = await request(BaseTest.server)
      .put('/api/address/' + resultAddress!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataAddressUpdate)
      .expect(HttpStatus.OK);
    expect(body.data).toEqual(jasmine.objectContaining(dataAddressUpdate));
  });

  it('Delete one [DELETE /api/address/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/address/' + resultAddress!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    expect(body.data).toEqual(jasmine.objectContaining(dataAddressUpdate));
  });

  it('Delete one [DELETE /api/user/:id]', async () => {
    // const { body } =
    await request(BaseTest.server)
      .delete('/api/user/' + result?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      // body.data.dob = new Date(body.data.dob);
      // body.data.startDate = new Date(body.data.startDate);
      // expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Delete one [DELETE /api/user/role/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/user/role/' + resultRole?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdateRole));
  });

  return afterAll(BaseTest.initAfterAll);
};
