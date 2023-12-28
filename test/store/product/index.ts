import { useSeederFactoryManager } from 'typeorm-extension';
import { HttpStatus } from "@nestjs/common";
import request from 'supertest';

import { BaseTest } from "@test";
import '@factories';
import { Category, Product, Store } from '@model';
import { CategoryService, ProductService, StoreService } from '@service';
import { Example } from '@shared';
import { CreateProductRequestDto, UpdateProductRequestDto } from '@dto';

export const testCase = (type?: string, permissions: string[] = []): void => {
    beforeAll(() => BaseTest.initBeforeAll(type, permissions));
    const factoryManager = useSeederFactoryManager();

    let data: CreateProductRequestDto;

    let testData: Product | null;
    let updateData: UpdateProductRequestDto | null;

    let store: Store | null;
    let category: Category | null;

    it('Create [POST /api/product]', async () => {
        store = await BaseTest.moduleFixture!.get(StoreService).create(
            await factoryManager.get(Store).make({
                userId: BaseTest.idUser
            })
        );
        category = await BaseTest.moduleFixture!.get(CategoryService).create(
            await factoryManager.get(Category).make({
                createdById: BaseTest.idUser
            })
        );
        data = await factoryManager.get(Product).make({
            storeId: store?.id,
            categoryId: category?.id
        });

        const { body } = await request(BaseTest.server)
            .post('/api/product')
            .send(data)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

        if (type)
            expect(body.data).toEqual(jasmine.objectContaining(data));
    })

    it('Get All [GET /api/produst]', async () => {
        testData = await BaseTest.moduleFixture!.get(ProductService).create(
            await factoryManager.get(Product).make({
                storeId: store?.id,
                categoryId: category?.id
            })
        )

        const {isDeleted, ...test} = testData!
        testData = test;

        const { body } = await request(BaseTest.server)
            .get('/api/product')
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN)
            
        if (type) {
            body.data[0].createdAt = new Date(body.data[0].createdAt);
            body.data[0].updatedAt = new Date(body.data[0].updatedAt);

            expect(body.data[0]).toEqual(jasmine.objectContaining(testData));
        }
    })

    it('Get one [GET /api/product/:id]', async () => {
        const { body } = await request(BaseTest.server)
            .get('/api/product/' + testData?.id)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

        if (type) {
            body.data.createdAt = new Date(body.data.createdAt);
            body.data.updatedAt = new Date(body.data.updatedAt);

            expect(body.data).toEqual(jasmine.objectContaining(testData));
        }
    })

    it('Update [PUT /api/product/:id]', async () => {
        const data = await factoryManager.get(Product).make();
        const { categoryId, storeId, ...update } = data;
        updateData = update;

        const { body } = await request(BaseTest.server)
            .put('/api/product/' + testData?.id)
            .send(update)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN)

        if (type)
            expect(body.data).toEqual(jasmine.objectContaining(updateData));
    })

    it('Update disable [PUT /api/product/:id/:boolean]', async () => {
        const { body } = await request(BaseTest.server)
            .put('/api/product/' + testData?.id + '/true')
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN)

        if (type) {
            expect(body.data).toEqual(jasmine.objectContaining(updateData));
            expect(body.data.isDisabled).not.toBeNull();
        }
    })

    it('Delete [DELETE /api/product/:id]', async () => {
        const { body } = await request(BaseTest.server)
            .delete('/api/product/' + testData?.id)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN)

        if (type) {
            expect(body.data).toEqual(jasmine.objectContaining(updateData));
            expect(body.data.isDeleted).not.toBeNull();
        }
    })

    // return afterAll(BaseTest.initAfterAll);
}