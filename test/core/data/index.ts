import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { Data, DataType } from '@model';
import { CreateDataTypeRequestDto, UpdateDataTypeRequestDto, CreateDataRequestDto, UpdateDataRequestDto } from '@dto';
import { DataService, DataTypeService } from '@service';
import '@factories';
import { BaseTest } from '@test';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();

  let dataType: CreateDataTypeRequestDto;
  let dataUpdateType: UpdateDataTypeRequestDto;
  let resultType: DataType | null;

  let data: CreateDataRequestDto;
  let dataUpdate: UpdateDataRequestDto;
  let result: Data | null;

  it('Create [POST /api/data/type]', async () => {
    dataType = await factoryManager.get(DataType).make();
    const { body } = await request(BaseTest.server)
      .post('/api/data/type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType as CreateDataTypeRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultType = body.data;
    }
  });

  it('Get all [GET /api/data/type]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/data/type?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  });

  it('Get one [GET /api/data/type/:id]', async () => {
    if (!type) resultType = await BaseTest.moduleFixture!.get(DataTypeService).create(dataType);
    const { body } = await request(BaseTest.server)
      .get('/api/data/type/' + resultType!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataType));
  });

  it('Update one [PUT /api/data/type/:id]', async () => {
    dataUpdateType = await factoryManager.get(DataType).make();
    delete dataUpdateType?.['code'];
    const { body } = await request(BaseTest.server)
      .put('/api/data/type/' + resultType!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateType)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
  });

  it('Update one [PUT /api/data/type/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/data/type/' + resultType!.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type)
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultType!.isDisabled }),
      );
  });

  // Api Data
  it('Create [POST /api/data]', async () => {
    data = await factoryManager.get(Data).make();
    data.type = resultType?.code || '';

    const { body } = await request(BaseTest.server)
      .post('/api/data')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { translations, ...test } = data;
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(test));
      result = body.data;
    }
  });

  it('Get all [GET /api/data]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/data?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      body.data[0].translations = data.translations;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { translations, ...test } = data;
      expect(body.data[0]).toEqual(jasmine.objectContaining(test));
    }
  });

  it('Get all [GET /api/data/array]', async () => {
    if (!type) result = await BaseTest.moduleFixture!.get(DataService).create(data);
    const { body } = await request(BaseTest.server)
      .get(`/api/data/array?array=%5B%22${dataType.code}%22%5D`)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);

    body.data[dataType.code][0].translations = data.translations;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { translations, ...test } = data;
    expect(body.data[dataType.code][0]).toEqual(jasmine.objectContaining(test));
  });

  it('Get one [GET /api/data/:id]', async () => {
    dataUpdate = await factoryManager.get(Data).make();
    const { body } = await request(BaseTest.server)
      .get('/api/data/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    if (type) {
      body.data.translations.forEach((item) => {
        let index;
        data.translations!.forEach((subItem, i: number) => {
          if (subItem.language === item.language) {
            index = i;
          }
        });
        expect(item).toEqual(jasmine.objectContaining(data.translations![index]));
        if (dataUpdate.translations) dataUpdate.translations[index].id = item.id;
      });
      body.data.translations = data.translations;
      expect(body.data).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Update one [PUT /api/data/:id]', async () => {
    dataUpdate.type = resultType?.code;
    dataUpdate.translations = result?.translations;
    const { body } = await request(BaseTest.server)
      .put('/api/data/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      body.data.translations = dataUpdate.translations;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { translations, ...test } = dataUpdate;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  it('Update one [PUT /api/data/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/data/' + result!.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type)
      expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result!.isDisabled }));
  });

  it('Delete one [DELETE /api/data/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/data/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      body.data.translations = dataUpdate.translations;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { translations, ...test } = dataUpdate;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  it('Delete one [DELETE /api/data/type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/data/type/' + resultType!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
  });

  return afterAll(BaseTest.initAfterAll);
};
