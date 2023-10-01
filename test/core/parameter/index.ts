import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { CreateParameterRequestDto, UpdateParameterRequestDto } from '@dto';
import { Parameter } from '@model';
import { ParameterService } from '@service';

import { BaseTest } from '@test';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const dataType: CreateParameterRequestDto = {
    code: faker.finance.bic(),
    vn: faker.lorem.paragraph(),
    en: faker.lorem.paragraph(),
  };

  const dataUpdate: UpdateParameterRequestDto = {
    code: faker.finance.bic(),
    vn: faker.lorem.paragraph(),
    en: faker.lorem.paragraph(),
  };
  let result: Parameter | null = {
    id: faker.string.uuid(),
    code: faker.finance.bic(),
    vn: faker.lorem.paragraph(),
    en: faker.lorem.paragraph(),
  };
  it('Create [POST /api/parameter/add]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/parameter/add')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      result = body.data;
    }
  });

  it('Get all [GET /api/parameter/list]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/parameter/list')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Get one [GET /api/parameter/:code]', async () => {
    if (!type) {
      result = await BaseTest.moduleFixture!.get(ParameterService).create(dataType);
    }
    const { body } = await request(BaseTest.server)
      .get('/api/parameter/' + result!.code)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    expect(body.data).toEqual(jasmine.objectContaining(dataType));
  });

  it('Update one [PUT /api/parameter/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/parameter/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Update one [PUT /api/parameter/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/parameter/' + result!.id + '/disable' + '/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result!.isDisabled }));
    }
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
