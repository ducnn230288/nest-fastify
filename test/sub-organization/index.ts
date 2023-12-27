import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { Address, ConnectKiotViet, Data, DataType, District, Province, SubOrganization, User, Ward } from '@model';
import { CreateDataTypeRequestDto, UpdateDataTypeRequestDto, CreateDataRequestDto, UpdateDataRequestDto, CreateSubOrganizationRequestDto, UpdateSubOrganizationDto } from '@dto';
import '@factories';
import { BaseTest } from '@test';
import { prefixRouter } from '@shared';
import { AddressService, DistrictService, ProvinceService, SubOrganizationService, UserService, WardService } from '@service';

const controller = '/sub-organization';
export const API = prefixRouter + controller;

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();


  let dataCreate: CreateSubOrganizationRequestDto;

  let userModel: User | null;
  let resultSubOrg;
  let dataUpdate: UpdateSubOrganizationDto;
  // it(`Create [POST ${API}]`, async () => {
  //   const dataSubOrg = await factoryManager.get(SubOrganization).make();
  //   const dataUser = await factoryManager.get(User).make();
  //   const dataAddress = await factoryManager.get(Address).make();
  //   const dataKiotViet = await factoryManager.get(ConnectKiotViet).make();    

  //   dataCreate = {
  //     ...dataSubOrg,
  //     emailContact: dataUser.email,
  //     nameContact: dataUser.name,
  //     phoneNumber: dataUser.phoneNumber,
  //     address: dataAddress,
  //     connectKiot : dataKiotViet
  //   }


  //   const { body } = await request(BaseTest.server)
  //     .post(API)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .send(dataCreate as CreateSubOrganizationRequestDto)
  //     .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

  //   console.log(body);


  //   return
  //   // if (type) {
  //   //   expect(body.data).toEqual(jasmine.objectContaining(dataType));
  //   //   resultType = body.data;
  //   // }
  // });

  it(`Create [Post ${API}]`, async () => {
    const distric = await factoryManager.get(District).make();
    const provine = await factoryManager.get(Province).make();
    const ward = await factoryManager.get(Ward).make();
    await BaseTest.moduleFixture!.get(ProvinceService).create(provine);
    await BaseTest.moduleFixture!.get(DistrictService).create({ ...distric, codeProvince: provine.code });
    await BaseTest.moduleFixture!.get(WardService).create({ ...ward, codeDistrict: distric.code });
    const dataSubOrg = await factoryManager.get(SubOrganization).make();
    const dataUser = await factoryManager.get(User).make();
    const dataAddress = await factoryManager.get(Address).make();
    const dataKiotViet = await factoryManager.get(ConnectKiotViet).make();
    dataCreate = {
      ...dataSubOrg,
      emailContact: dataUser.email,
      nameContact: dataUser.name,
      phoneNumber: dataUser.phoneNumber,
      address: dataAddress,
      connectKiot: dataKiotViet
    };


    const { body } = await request(BaseTest.server)
      .post(API)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataCreate as CreateSubOrganizationRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    resultSubOrg = body.data
    // console.log(resultSubOrg);

  });

  it(`Update one [PUT ${API}/:id]`, async () => {
    const distric = await factoryManager.get(District).make();
    const provine = await factoryManager.get(Province).make();
    const ward = await factoryManager.get(Ward).make();
    // await BaseTest.moduleFixture!.get(ProvinceService).create(provine);
    // await BaseTest.moduleFixture!.get(DistrictService).create({...distric,codeProvince:provine.code});
    // await BaseTest.moduleFixture!.get(WardService).create({...ward,codeDistrict:distric.code});
    const dataSubOrg = await factoryManager.get(SubOrganization).make();
    const dataUser = await factoryManager.get(User).make();
    const dataAddress = await factoryManager.get(Address).make();
    const dataKiotViet = await factoryManager.get(ConnectKiotViet).make();



    dataUpdate = {
      ...dataSubOrg,
      emailContact: dataUser.email,
      nameContact: dataUser.name,
      phoneNumber: dataUser.phoneNumber,
      address: dataAddress,
      connectKiot: dataKiotViet
    };
    // resultSubOrg =  await BaseTest.moduleFixture!.get(SubOrganizationService).create(dataUpdate);
    console.log('resultSubOrg', resultSubOrg);

    console.log('dât',dataUpdate);
    

    const { body } = await request(BaseTest.server)
      .put(API + '/' + resultSubOrg!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    // console.log("body",body);

    //  if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
  });
  it(`Update active status [PUT ${API}/:id/active-status]`, async () => {
    const distric = await factoryManager.get(District).make();
    const provine = await factoryManager.get(Province).make();
    const ward = await factoryManager.get(Ward).make();
    // await BaseTest.moduleFixture!.get(ProvinceService).create(provine);
    // await BaseTest.moduleFixture!.get(DistrictService).create({...distric,codeProvince:provine.code});
    // await BaseTest.moduleFixture!.get(WardService).create({...ward,codeDistrict:distric.code});
    const dataSubOrg = await factoryManager.get(SubOrganization).make();
    const dataUser = await factoryManager.get(User).make();
    const dataAddress = await factoryManager.get(Address).make();
    const dataKiotViet = await factoryManager.get(ConnectKiotViet).make();



    dataUpdate = {
      ...dataSubOrg,
      emailContact: dataUser.email,
      nameContact: dataUser.name,
      phoneNumber: dataUser.phoneNumber,
      address: dataAddress,
      connectKiot: dataKiotViet
    };
    // resultSubOrg =  await BaseTest.moduleFixture!.get(SubOrganizationService).create(dataUpdate);





    const { body } = await request(BaseTest.server)
      .put(API + '/' + resultSubOrg!.id + "/active-status")
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send({ isActive: false })
    //.expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    console.log("body", body);

    //  if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
  });
  
  it(`Delete [DELETE ${API}/:id]`, async () => {
    const { body } = await request(BaseTest.server)
      .delete(API + '/' + resultSubOrg?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    
    
  
  });
  // it(`Get one [GET ${API}/:id ]`, async () => {
  //   if (!type) {
  //     resultSubOrg = await BaseTest.moduleFixture!.get(SubOrganizationService).create(dataCreate);
  //   }
  //   const { body } = await request(BaseTest.server)
  //     .get(API + '/detail/' + resultSubOrg?.id )
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //     if (type) {
  //       expect(body.data).toEqual(jasmine.objectContaining(resultSubOrg));
  //     }
  // });
  // it('Get all [GET /api/data-type]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .get('/api/data-type')
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   if (type) expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  // });

  // it('Get one [GET /api/data-type/:id]', async () => {
  //   if (!type) resultType = await BaseTest.moduleFixture!.get(DataTypeService).create(dataType);
  //   const { body } = await request(BaseTest.server)
  //     .get('/api/data-type/' + resultType!.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(HttpStatus.OK);
  //   if (type) expect(body.data).toEqual(jasmine.objectContaining(dataType));
  // });

  // it('Update one [PUT /api/data-type/:id]', async () => {
  //   dataUpdateType = await factoryManager.get(DataType).make();
  //   delete dataUpdateType?.['code'];
  //   const { body } = await request(BaseTest.server)
  //     .put('/api/data-type/' + resultType!.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .send(dataUpdateType)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

  //   if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
  // });

  // it('Update one [PUT /api/data-type/:id/disable/:boolean]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .put('/api/data-type/' + resultType!.id + '/disable' + '/true')
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

  //   if (type)
  //     expect({ isDisabled: body.isDisabled }).not.toEqual(
  //       jasmine.objectContaining({ isDisabled: resultType!.isDisabled }),
  //     );
  // });

  // // Api Data
  // it('Create [POST /api/data]', async () => {
  //   data = await factoryManager.get(Data).make();
  //   data.type = resultType?.code || '';

  //   const { body } = await request(BaseTest.server)
  //     .post('/api/data')
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .send(data)
  //     .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { translations, ...test } = data;
  //   if (type) {
  //     expect(body.data).toEqual(jasmine.objectContaining(test));
  //     result = body.data;
  //   }
  // });

  // it('Get all [GET /api/data]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .get('/api/data')
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

  //   if (type) {
  //     body.data[0].translations = data.translations;
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { translations, ...test } = data;
  //     expect(body.data[0]).toEqual(jasmine.objectContaining(test));
  //   }
  // });

  // it('Get all [GET /api/data/array]', async () => {
  //   if (!type) result = await BaseTest.moduleFixture!.get(DataService).create(data);
  //   const { body } = await request(BaseTest.server)
  //     .get(`/api/data/array?array=%5B%22${dataType.code}%22%5D`)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(HttpStatus.OK);

  //   body.data[dataType.code][0].translations = data.translations;
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { translations, ...test } = data;
  //   expect(body.data[dataType.code][0]).toEqual(jasmine.objectContaining(test));
  // });

  // it('Get one [GET /api/data/:id]', async () => {
  //   dataUpdate = await factoryManager.get(Data).make();
  //   const { body } = await request(BaseTest.server)
  //     .get('/api/data/' + result!.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(HttpStatus.OK);
  //   if (type) {
  //     body.data.translations.forEach((item) => {
  //       let index;
  //       data.translations!.forEach((subItem, i: number) => {
  //         if (subItem.language === item.language) {
  //           index = i;
  //         }
  //       });
  //       expect(item).toEqual(jasmine.objectContaining(data.translations![index]));
  //       if (dataUpdate.translations) dataUpdate.translations[index].id = item.id;
  //     });
  //     body.data.translations = data.translations;
  //     expect(body.data).toEqual(jasmine.objectContaining(data));
  //   }
  // });

  // it('Update one [PUT /api/data/:id]', async () => {
  //   dataUpdate.type = resultType?.code;
  //   dataUpdate.translations = result?.translations;
  //   const { body } = await request(BaseTest.server)
  //     .put('/api/data/' + result!.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .send(dataUpdate)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

  //   if (type) {
  //     body.data.translations = dataUpdate.translations;
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { translations, ...test } = dataUpdate;
  //     expect(body.data).toEqual(jasmine.objectContaining(test));
  //   }
  // });

  // it('Update one [PUT /api/data/:id/disable/:boolean]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .put('/api/data/' + result!.id + '/disable' + '/true')
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

  //   if (type)
  //     expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result!.isDisabled }));
  // });

  // it('Delete one [DELETE /api/data/:id]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .delete('/api/data/' + result!.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   if (type) {
  //     body.data.translations = dataUpdate.translations;
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { translations, ...test } = dataUpdate;
  //     expect(body.data).toEqual(jasmine.objectContaining(test));
  //   }
  // });

  // it('Delete one [DELETE /api/data-type/:id]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .delete('/api/data-type/' + resultType!.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
  // });

  return afterAll(BaseTest.initAfterAll);
};
