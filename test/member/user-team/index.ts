import { faker } from '@faker-js/faker';
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { CreateTeamRequestDto } from '@dto';
import { User, UserRole, UserTeam } from '@model';
import { P_USER_TEAM_CREATE, UserRoleService, UserService } from '@service';
import { Example } from '@shared';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  const factoryManager = useSeederFactoryManager();
  let data: CreateTeamRequestDto;
  let resultData: UserTeam;

  it('Create [POST /api/user-team]', async () => {
    const dataRole = await factoryManager.get(UserRole).make({
      permissions: [P_USER_TEAM_CREATE],
    });
    const resultRole = await BaseTest.moduleFixture?.get(UserRoleService).create(dataRole);
    const dataUser = {
      ...(await factoryManager.get(User).make({ roleCode: resultRole?.code })),
      retypedPassword: Example.password,
    };
    const resultUser = await BaseTest.moduleFixture?.get(UserService).create(dataUser);

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
  return afterAll(BaseTest.initAfterAll);
};
