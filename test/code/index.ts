import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';

import { Code, CodeType } from '@model';
import { CreateCodeTypeRequestDto, UpdateCodeTypeRequestDto, CreateCodeRequestDto, UpdateCodeRequestDto } from '@dto';

import { BaseTest } from '../base';

export const testCase = (type?: string, permissions: string[] = []) => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  afterAll(BaseTest.initAfterAll);

  const dataType: CreateCodeTypeRequestDto = {
    name: faker.person.jobType(),
    code: faker.finance.bic(),
  };
  const dataUpdateType: UpdateCodeTypeRequestDto = {
    name: faker.person.jobType(),
  };
  let resultType: CodeType = {
    id: faker.string.uuid(),
    name: faker.person.jobType(),
    code: faker.finance.bic(),
  };

  const data: CreateCodeRequestDto = {
    name: faker.person.jobType(),
    code: faker.finance.bic(),
    type: dataType.code,
    description: faker.lorem.paragraph(),
  };

  const dataUpdate: UpdateCodeRequestDto = {
    name: faker.person.jobType(),
  };

  let result: Code = {
    id: faker.string.uuid(),
    name: faker.person.jobType(),
    type: resultType.code,
    code: faker.finance.bic(),
  };

  //code-type
  it('Create [POST /api/code-type/add]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/code-type/add')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultType = body.data;
    }
  });

  it('Get all [GET /api/code-type/list]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/code-type/list')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Get one [GET /api/code-type/:code]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/code-type/' + resultType.code)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
    }
  });

  it('Update one [PUT /api/code-type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/code-type/' + resultType.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateType)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
    }
  });

  it('Update one [PUT /api/code-type/:id/disable/:bolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/code-type/' + resultType.id + '/disable/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send()
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultType.isDisabled }),
      );
    }
  });

  it('Create [POST /api/code/add]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/code/add')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(data));
      result = body.data;
    }
  });

  it('Get all [GET /api/code/list]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/code/list')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Get one [GET /api/code/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/code/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Update one [PUT /api/code/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/code/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Update one [PUT /api/code/:id/disable/:bolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/code-type/' + resultType.id + '/disable/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result.isDisabled }));
    }
  });

  it('Delete one [DELETE /api/code/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/code/' + result.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
    }
  });

  it('Delete one [DELETE /api/code-type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/code-type/' + resultType.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
    }
  });
};
