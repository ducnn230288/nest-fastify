import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as http from 'http';
import { useSeederFactoryManager } from 'typeorm-extension';

import { UserRoleService, UserService } from '@service';
import { User } from '@model';
import { AppModule } from '../src/app.module';
import { AppDataSource } from '../database/data-source';

export const BaseTest: {
  moduleFixture?: TestingModule;
  serviceRole?: UserRoleService;
  serviceUser?: UserService;
  app?: NestFastifyApplication;
  server?: http.Server;
  token: undefined;

  login: (user: User) => Promise<void>;
  loginAdmin: () => Promise<void>;
  loginRole: (permissions?: string[]) => Promise<void>;
  loginUser: () => Promise<void>;

  initBeforeAll: (type?: string, permissions?: string[]) => Promise<void>;
  initAfterAll: () => Promise<void>;
} = {
  app: undefined,
  server: undefined,
  token: undefined,
  serviceRole: undefined,
  serviceUser: undefined,

  initBeforeAll: async (type?: string, permissions: string[] = []) => {
    await new Promise((res) => setTimeout(res, 1));
    await AppDataSource.initialize();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    BaseTest.serviceRole = moduleFixture.get<UserRoleService>(UserRoleService);
    BaseTest.serviceUser = moduleFixture.get<UserService>(UserService);
    BaseTest.moduleFixture = moduleFixture;
    BaseTest.app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await BaseTest.app.init();
    await BaseTest.app.getHttpAdapter().getInstance().ready();
    BaseTest.server = BaseTest.app.getHttpServer();
    switch (type) {
      case 'Admin':
        await BaseTest.loginAdmin();
        break;
      case 'Role':
        await BaseTest.loginRole(permissions);
        break;
      default:
        await BaseTest.loginUser();
    }
  },
  login: async (user) => {
    await BaseTest.serviceUser!.create({ ...user, retypedPassword: user.password! });
    const { body } = await request(BaseTest.server)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: user.password,
      })
      .expect(HttpStatus.CREATED);
    BaseTest.token = body.data.accessToken;
  },
  loginAdmin: async () => {
    const role = await BaseTest.serviceRole!.create({
      name: 'Administrator',
      isSystemAdmin: true,
      permissions: [],
      code: 'supper_admin',
    });
    const factoryManager = useSeederFactoryManager();
    await BaseTest.login(await factoryManager.get(User).make({ roleCode: role!.code }));
  },
  loginUser: async () => {
    const factoryManager = useSeederFactoryManager();
    await BaseTest.login(await factoryManager.get(User).make());
  },
  loginRole: async (permissions: string[] = []) => {
    const role = await BaseTest.serviceRole!.create({
      name: 'Role',
      isSystemAdmin: false,
      permissions,
      code: 'role',
    });
    const factoryManager = useSeederFactoryManager();
    await BaseTest.login(await factoryManager.get(User).make({ roleCode: role!.code }));
  },

  initAfterAll: async () => {
    await BaseTest.app!.close();
    await AppDataSource.dropDatabase();
  },
};
