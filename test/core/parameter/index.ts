import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { Parameter } from '@model';
import { CreateParameterRequestDto, UpdateParameterRequestDto } from '@dto';
import { ParameterService } from '@service';
import '@factories';
import { BaseTest } from '@test';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataType: CreateParameterRequestDto;
  let dataUpdate: UpdateParameterRequestDto;
  let result: Parameter | null;

  it('Create [POST /api/parameter/]', async () => {
    dataType = await factoryManager.get(Parameter).make();
    const { body } = await request(BaseTest.server)
      .post('/api/parameter')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      result = body.data;
    }
  });

  it('Get all [GET /api/parameter/]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/parameter?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  });

  it('Get one [GET /api/parameter/:code]', async () => {
    if (!type) result = await BaseTest.moduleFixture!.get(ParameterService).create(dataType);
    const { body } = await request(BaseTest.server)
      .get('/api/parameter/' + result!.code)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    expect(body.data).toEqual(jasmine.objectContaining(dataType));
  });

  it('Update one [PUT /api/parameter/:id]', async () => {
    dataUpdate = await factoryManager.get(Parameter).make();
    const { body } = await request(BaseTest.server)
      .put('/api/parameter/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
  });

  it('Update one [PUT /api/parameter/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/parameter/' + result!.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type)
      expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result!.isDisabled }));
  });

  it('Delete one [DELETE /api/parameter/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/parameter/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { code, en, vn, ...test } = dataUpdate;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
