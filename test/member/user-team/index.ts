import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { CreateTeamRequestDto, UpdateTeamRequestDto } from '@dto';
import { User, UserRole, UserTeam } from '@model';
import { P_USER_TEAM_CREATE, UserRoleService, UserService } from '@service';
import { Example } from '@shared';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  const factoryManager = useSeederFactoryManager();
  let data: CreateTeamRequestDto;
  let dataUpdate: UpdateTeamRequestDto;
  let resultData: UserTeam | null;

  let resultUser: User | null;
  let resultRole: UserRole | null;

  it('Create [POST /api/user-team]', async () => {
    resultRole = await BaseTest.moduleFixture!.get(UserRoleService).create(
      await factoryManager.get(UserRole).make({
        permissions: [P_USER_TEAM_CREATE],
      }),
    );

    resultUser = await BaseTest.moduleFixture!.get(UserService).create({
      ...(await factoryManager.get(User).make({ roleCode: resultRole?.code })),
      retypedPassword: Example.password,
    });

    data = await factoryManager.get(UserTeam).make({
      managerId: resultUser?.id,
    });

    const { body } = await request(BaseTest.server)
      .post('/api/user-team')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(data)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(data));
      resultData = body.data;
    }
  });

  it('Get all [GET /api/user-team]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/user-team')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);
    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(resultData));
    }
  });

  it('Get one [GET /api/user-team/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/user-team/' + resultData?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(resultData));
    }
  });

  it('Update [PUT /api/user-team/:id]', async () => {
    dataUpdate = await factoryManager.get(UserTeam).make();

    const { body } = await request(BaseTest.server)
      .put('/api/user-team/' + resultData?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { updatedAt, name, description, ...test } = resultData!;
      expect(body.data).toEqual(jasmine.objectContaining(dataUpdate));
      expect(body.data).toEqual(jasmine.objectContaining(test));
      resultData = body.data;
    }
  });

  it('Delete [DELETE /api/user-team/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/user-team/' + resultData?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { updatedAt, ...test } = resultData!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
