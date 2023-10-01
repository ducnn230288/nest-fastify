// import request from 'supertest';
// import { HttpStatus } from '@nestjs/common';
// import { BaseTest } from '@test';

// type?: string, permissions: string[] = []
export const testCase = (): void => {
  // beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  // afterAll(BaseTest.initAfterAll);
  // let result;
  // it('Create [POST /api/file/add]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .post('/api/file/add')
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .attach('file', 'test/file/test.png')
  //     .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
  //   if (type) {
  //     console.log(body);
  //     result = body.data;
  //   }
  // });
  // it('Get all [GET /api/file/list]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .get('/api/file/list')
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   if (type) {
  //     expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  //   }
  // });
  //
  // it('Get one [GET /api/file/:code]', async () => {
  //   if (!type) {
  //     result = await BaseTest.moduleFixture.get(ParameterService).create(dataType);
  //   }
  //   const { body } = await request(BaseTest.server)
  //     .get('/api/file/' + result.code)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(HttpStatus.OK);
  //   expect(body.data).toEqual(jasmine.objectContaining(dataType));
  // });
  //
  // it('Update one [PUT /api/file/:id]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .put('/api/file/' + result.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .send(dataUpdate)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   if (type) {
  //     expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
  //   }
  // });
  //
  // it('Delete one [DELETE /api/file/:id]', async () => {
  //   const { body } = await request(BaseTest.server)
  //     .delete('/api/file/' + result.id)
  //     .set('Authorization', 'Bearer ' + BaseTest.token)
  //     .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
  //   if (type) {
  //     const { code, en, vn, ...test } = dataUpdate;
  //     expect(body.data).toEqual(jasmine.objectContaining(test));
  //   }
  // });
};
