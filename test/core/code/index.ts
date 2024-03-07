import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { Code, CodeType } from '@model';
import { CreateCodeTypeRequestDto, UpdateCodeTypeRequestDto, CreateCodeRequestDto, UpdateCodeRequestDto } from '@dto';
import { CodeService, CodeTypeService } from '@service';
import '@factories';
import { BaseTest } from '@test';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataType: CreateCodeTypeRequestDto;
  let dataUpdateType: UpdateCodeTypeRequestDto;
  let resultType: CodeType | null;

  let data: CreateCodeRequestDto;
  let dataUpdate: UpdateCodeRequestDto;
  let result: Code | null;

  //code/type
  it('Create [POST /api/code/type]', async () => {
    dataType = await factoryManager.get(CodeType).make();
    const { body } = await request(BaseTest.server)
      .post('/api/code/type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultType = body.data;
    }
  });

  it('Get all [GET /api/code/type]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/code/type?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  });
  it('Get one [GET /api/code/type/:code]', async () => {
    if (!type)
      resultType = await BaseTest.moduleFixture!.get(CodeTypeService).create(await factoryManager.get(CodeType).make());
    const { body } = await request(BaseTest.server)
      .get('/api/code/type/' + resultType!.code)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataType));
  });

  it('Update one [PUT /api/code/type/:id]', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { code, ...makeData } = await factoryManager.get(CodeType).make();
    dataUpdateType = makeData;
    const { body } = await request(BaseTest.server)
      .put('/api/code/type/' + resultType!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdateType)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
      resultType = body.data;
    }
  });

  it('Update one [PUT /api/code/type/:id/disable/:bolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/code/type/' + resultType!.id + '/disable/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send()
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type)
      expect({ isDisabled: body.isDisabled }).not.toEqual(
        jasmine.objectContaining({ isDisabled: resultType!.isDisabled }),
      );
  });

  it('Create [POST /api/code]', async () => {
    data = await factoryManager.get(Code).make({ type: resultType!.code });

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
      .get('/api/code?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data[0]).toEqual(jasmine.objectContaining(data));
  });

  it('Get one [GET /api/code/:id]', async () => {
    if (!type)
      result = await BaseTest.moduleFixture!.get(CodeService).create(
        await factoryManager.get(Code).make({ type: resultType!.code }),
      );
    const { body } = await request(BaseTest.server)
      .get('/api/code/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(data));
  });

  it('Update one [PUT /api/code/:id]', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { code, ...makeData } = await factoryManager.get(Code).make({ type: resultType!.code });
    dataUpdate = makeData;
    const { body } = await request(BaseTest.server)
      .put('/api/code/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
  });

  it('Update one [PUT /api/code/:id/disable/:bolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/code/' + result!.id + '/disable/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type)
      expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result!.isDisabled }));
  });

  it('Delete one [DELETE /api/code/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/code/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
  });

  it('Delete one [DELETE /api/code/type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/code/type/' + resultType!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataUpdateType));
  });

  return afterAll(BaseTest.initAfterAll);
};
