import { HttpStatus } from "@nestjs/common";
import { useSeederFactoryManager } from 'typeorm-extension';
import { randomUUID } from "crypto";
import request from 'supertest';

import { Category } from "@model";
import { BaseTest } from "@test";
import { CategoryService } from "@service";
import '@factories';

export const testCase = (type?: string, permissions: string[] = []): void => {
    beforeAll(() => BaseTest.initBeforeAll(type, permissions));
    const factoryManager = useSeederFactoryManager();

    let data: Category;

    let result: Category;

    it('Create new Category is Parent [POST /api/category]', async () => {
        data = await factoryManager.get(Category).make();

        const { body } = await request(BaseTest.server)
            .post('/api/category')
            .send(data)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);


        if (type) {
            expect(body.data).toEqual(jasmine.objectContaining(data));
        }
    })

    it('Create Category with name is exist [POST /api/category]', async () => {
        const { body } = await request(BaseTest.server)
            .post('/api/category')
            .send(data)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.BAD_REQUEST : HttpStatus.FORBIDDEN);

        if (type)
            expect(body.message).toEqual("Tên Category đã tồn tại");
    })

    it('Create Category with Parent is exist [POST /api/category]', async () => {
        const testData = await factoryManager.get(Category).make();
        const testCategory = await BaseTest.moduleFixture!.get(CategoryService).create({
            ...testData,
            createdById: BaseTest.idUser
        });
        result = testCategory!;

        const test = await factoryManager.get(Category).make({ parentId: result.id });
        let response = await request(BaseTest.server).post('/api/category')
            .send(test)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

        if (type) {
            const data = response.body.data;
            expect(data.parentId).toEqual(testCategory!.id);
        }
    })

    it('Get All [GET /api/category]', async () => {
        const { body } = await request(BaseTest.server)
            .get('/api/category')
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    })

    it('Get one [GET /api/category/:id]', async () => {
        const { body } = await request(BaseTest.server)
            .get('/api/category/' + result.id!)
            .set('Authorization', 'Bearer' + BaseTest.token)
            .expect(HttpStatus.OK);
    })

    it('Get one category not exist [GET /api/category/:id]', async () => {
        const randomId = randomUUID();

        const { body } = await request(BaseTest.server)
            .get('/api/category/' + randomId)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(HttpStatus.BAD_REQUEST);

        expect(body.message).toEqual(`Dữ liệu ${randomId} không tồn tại`);
    })

    it('Update Category [PUT /api/category/:id]', async () => {
        const updateCategory = await factoryManager.get(Category).make();

        const { body } = await request(BaseTest.server)
            .put('/api/category/' + result.id!)
            .send(updateCategory)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

        if (type) {
            expect(body.data).toEqual(jasmine.objectContaining(updateCategory));
            result = body.data;
        }
    })

    it('Update Category with name is exits [PUT /api/category/:id]', async () => {
        const testData = await factoryManager.get(Category).make();
        const testCategory = await BaseTest.moduleFixture!.get(CategoryService).create({
            ...testData,
            createdById: BaseTest.idUser
        });

        const { body } = await request(BaseTest.server)
            .put('/api/category/' + result.id!)
            .send({ name: testData.name })
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.BAD_REQUEST : HttpStatus.FORBIDDEN)

        if (type)
            expect(body.message).toEqual("Tên Category đã tồn tại");
    })

    it('Disable Category [PUT /api/category/:id/disable/:boolean]', async () => {
        const { body } = await request(BaseTest.server)
            .put('/api/category/' + result.id! + '/disable/true')
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    })

    it('Delete Category [DELETE /api/category/:id]', async () => {
        const { body } = await request(BaseTest.server)
            .delete('/api/category/' + result.id!)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    })

    return afterAll(BaseTest.initAfterAll);
}