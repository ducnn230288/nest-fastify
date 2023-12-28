import { useSeederFactoryManager } from 'typeorm-extension';
import { HttpStatus } from "@nestjs/common";
import request from 'supertest';

import { BaseTest } from "@test";
import '@factories';
import { Store, User } from '@model';
import { StoreService, UserService } from '@service';
import { Example } from '@shared';
import { CreateStoreRequestDto, UpdateStoreRequestDto } from '@dto';

export const testCase = (type?: string, permissions: string[] = []): void => {
    beforeAll(() => BaseTest.initBeforeAll(type, permissions));
    const factoryManager = useSeederFactoryManager();

    let data: CreateStoreRequestDto;
    let updateData: UpdateStoreRequestDto;

    let result: Store | null;
    let user: User | null;

    it('Create [POST /api/store]', async () => {
        const dataUser = await factoryManager.get(User).make();
        const testUser = {
            ...dataUser,
            password: Example.password,
            retypedPassword: Example.password,
        }
        user = await BaseTest.moduleFixture!.get(UserService).create(testUser);

        data = await factoryManager.get(Store).make();

        const { body } = await request(BaseTest.server)
            .post('/api/store')
            .send({
                ...data,
                userId: user?.id
            })
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

        if (type) {
            expect(body.data).toEqual(jasmine.objectContaining(data));
        }
    })

    it('Get All [GET /api/store]', async () => {
        result = await BaseTest.moduleFixture!.get(StoreService).create(
            await factoryManager.get(Store).make({ userId: user?.id })
        );

        const { body } = await request(BaseTest.server)
            .get('/api/store')
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

        if (type) {
            body.data[0].createdAt = new Date(body.data[0].createdAt);
            body.data[0].updatedAt = new Date(body.data[0].updatedAt);

            expect(result).toEqual(jasmine.objectContaining(body.data[0]));
        }
    })

    it('Get One [GET /api/store/:id]', async () => {
        const { body } = await request(BaseTest.server)
            .get('/api/store/' + result?.id)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN)

        if (type) {
            body.data.createdAt = new Date(body.data.createdAt);
            body.data.updatedAt = new Date(body.data.updatedAt);

            expect(result).toEqual(jasmine.objectContaining(body.data));
        }
    })

    it('Update Store [PUT /api/store/:id]', async () => {
        updateData = await factoryManager.get(Store).make({ userId: user?.id });

        const { body } = await request(BaseTest.server)
            .put('/api/store/' + result?.id)
            .send(updateData)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN)

        if (type)
            expect(body.data).toEqual(jasmine.objectContaining(updateData));

    })

    it('Update Disable [PUT /api/store/:id/disable/boolean]', async () => {
        const { body } = await request(BaseTest.server)
            .put('/api/store/' + result?.id + '/disable/true')
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN)

        if (type) {
            expect(body.data).toEqual(jasmine.objectContaining(updateData));
            expect(body.data.isDisabled).not.toBeNull();
        }
    })

    it('Delete [DELETE /api/store/:id]', async () => {
        const { body } = await request(BaseTest.server)
            .delete('/api/store/' + result?.id)
            .set('Authorization', 'Bearer ' + BaseTest.token)
            .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

        if (type)
            expect(body.data).toEqual(jasmine.objectContaining(updateData));
    })

    return afterAll(BaseTest.initAfterAll);
}