import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { Code, CodeType } from '@model';
import { CreateCodeTypeRequestDto, UpdateCodeTypeRequestDto, CreateCodeRequestDto, UpdateCodeRequestDto } from '@dto';

import { BaseTest } from '@test';
import '@factories';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataType: CreateCodeTypeRequestDto;
  let dataUpdateType: UpdateCodeTypeRequestDto;
  let resultType: CodeType;

  let data: CreateCodeRequestDto;
  // let dataUpdate: UpdateCodeRequestDto;
  const dataUpdate: UpdateCodeRequestDto = {
    name: faker.person.jobType(),
  };
  let result: Code;
  /*
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
  };*/

  /*
  const data: CreateCodeRequestDto = {
    name: faker.person.jobType(),
    code: faker.finance.bic(),
    type: dataType.code,
    description: faker.lorem.paragraph(),
  };


  let result: Code = {
    id: faker.string.uuid(),
    name: faker.person.jobType(),
    type: resultType.code,
    code: faker.finance.bic(),
  };*/

  //code-type
  it('Create [POST /api/code-type]', async () => {
    dataType = await factoryManager.get(CodeType).make();
    const { body } = await request(BaseTest.server)
      .post('/api/code-type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultType = body.data;
    }
  });

  it('Get all [GET /api/code-type]', async () => {
    if (!type) {
      resultType = await factoryManager.get(CodeType).make();
    }
    const { body } = await request(BaseTest.server)
      .get('/api/code-type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
    }
    console.log(body);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { code, ...makeData } = await factoryManager.get(CodeType).make();
    dataUpdateType = makeData;

    const { body } = await request(BaseTest.server)
      .put('/api/code-type/' + resultType.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateType)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
      resultType = body.data;
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

  it('Create [POST /api/code]', async () => {
    data = await factoryManager.get(Code).make();
    data.type = resultType.code;
    result = await factoryManager.get(Code).make();

    const { body } = await request(BaseTest.server)
      .post('/api/code')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(data));
      result = body.data;
    }
  });

  it('Get all [GET /api/code]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/code')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(data));
    }
  });

  it('Get one [GET /api/code/:id]', async () => {
    if (!type) {
      result.id = faker.string.uuid();
    }
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

  // anh put nhầm api em sửa lại

  // it('Update one [PUT /api/code/:id/disable/:bolean]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .put('/api/code-type/' + resultType.id + '/disable/true')
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   if (type) {
  //     expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result.isDisabled }));
  //   }
  // });

  it('Update one [PUT /api/code/:id/disable/:bolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/code/' + result.id + '/disable/true')
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

  return afterAll(BaseTest.initAfterAll);
};
