import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { Post, PostType } from '@model';
import { UpdatePostRequestDto, CreatePostRequestDto, CreatePostTypeRequestDto } from '@dto';
import { PostTypeService, PostService } from '@service';
import '@factories';
import { BaseTest } from '@test';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();
  let dataType: CreatePostTypeRequestDto;
  let resultType: PostType | null;

  let data: CreatePostRequestDto;
  let dataUpdate: UpdatePostRequestDto;
  let result: Post | null;

  //post/type
  it('Create [POST /api/post/type]', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isPrimary, ...test } = await factoryManager.get(PostType).make();
    dataType = test;

    const { body } = await request(BaseTest.server)
      .post('/api/post/type')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(dataType));
      resultType = body.data;
    }
  });

  it('Get all [GET /api/post/type]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/post/type?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data[0]).toEqual(jasmine.objectContaining(dataType));
  });

  it('Get one [GET /api/post/type/:id]', async () => {
    if (!type) resultType = await BaseTest.moduleFixture!.get(PostTypeService).create(dataType);
    const { body } = await request(BaseTest.server)
      .get('/api/post/type/' + resultType!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataType));
  });

  it('Update one [PUT /api/post/type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/post/type/' + resultType!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataType));
  });

  it('Update one [PUT /api/post/type/:id/disable/:bolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/post/type/' + resultType!.id + '/disable/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataType)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataType));
  });

  //Post

  it('Create [POST /api/post]', async () => {
    data = await factoryManager.get(Post).make();
    data.type = dataType.code;
    const { body } = await request(BaseTest.server)
      .post('/api/post')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data as CreatePostRequestDto)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { translations, ...test } = data;
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(test));
      result = body.data;
    }
  });

  it('Get all [GET /api/post]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/post?page=1&perPage=19&filter=%7B%7D&sorts=null')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { translations, ...test } = data;
    if (type) expect(body.data[0]).toEqual(jasmine.objectContaining(test));
  });

  it('Get all [GET /api/post/array]', async () => {
    if (!type) result = await BaseTest.moduleFixture!.get(PostService).create(data);
    const { body } = await request(BaseTest.server)
      .get(`/api/post/array?array=%5B%22${dataType.code}%22%5D`)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);

    body.data[dataType.code][0].translations = data.translations;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { translations, ...test } = data;
    expect(body.data[dataType.code][0]).toEqual(jasmine.objectContaining(test));
  });

  it('Get detail [GET /api/post/slug/:slug]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/post/slug/' + data!.translations![0].slug)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);

    if (type) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { translations, ...test } = data;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  it('Get one [GET /api/post/:id]', async () => {
    dataUpdate = await factoryManager.get(Post).make();
    dataUpdate.type = dataType.code;
    const { body } = await request(BaseTest.server)
      .get('/api/post/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(HttpStatus.OK);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { translations, ...test } = data;
    if (type) {
      body.data.translations.forEach((item) => {
        let index = 0;
        data!.translations!.forEach((subItem, i) => {
          if (subItem.language === item.language) {
            index = i;
          }
        });
        expect(item).toEqual(jasmine.objectContaining(data!.translations![index]));
        if (dataUpdate.translations) dataUpdate.translations[index].id = item.id;
      });
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  it('Update one [PUT /api/post/:id]', async () => {
    dataUpdate = await factoryManager.get(Post).make();
    delete dataUpdate.type;
    dataUpdate.translations = result?.translations;
    const { body } = await request(BaseTest.server)
      .put('/api/post/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { translations, ...test } = dataUpdate;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  it('Update one [PUT /api/post/:id/disable/:boolean]', async () => {
    const { body } = await request(BaseTest.server)
      .put('/api/post/' + result!.id + '/disable/true')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type)
      expect({ isDisabled: body.isDisabled }).not.toEqual(jasmine.objectContaining({ isDisabled: result!.isDisabled }));
  });

  it('Delete one [DELETE /api/post/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/post/' + result!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { translations, ...test } = dataUpdate;
    if (type) expect(body.data).toEqual(jasmine.objectContaining(test));
  });

  it('Delete one [DELETE /api/post/type/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/post/type/' + resultType!.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) expect(body.data).toEqual(jasmine.objectContaining(dataType));
  });

  return afterAll(BaseTest.initAfterAll);
};
