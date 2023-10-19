import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import { User } from '@model';
import { RegisterAuthRequestDto, AuthDto, ProfileAuthRequestDto, RestPasswordAuthRequestDto } from '@dto';
import { Example } from '@shared';
import '@factories';
import { BaseTest } from '@test';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));

  const factoryManager = useSeederFactoryManager();

  let data: RegisterAuthRequestDto;
  let dataUpdate: ProfileAuthRequestDto;
  let restPassword: RestPasswordAuthRequestDto;
  let result: User;
  let login: AuthDto;

  it('Register [POST /api/auth/register]', async () => {
    const fakerData = await factoryManager.get(User).make();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, dateLeave, ...data2 } = fakerData;
    data = {
      ...data2,
      password: Example.password,
      retypedPassword: Example.password,
    };

    const { body } = await request(BaseTest.server).post('/api/auth/register').send(data).expect(HttpStatus.CREATED);
    body.data.dob = new Date(body.data.dob);
    body.data.startDate = new Date(body.data.startDate);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, retypedPassword, ...testData } = data;
    expect(body.data).toEqual(jasmine.objectContaining(testData));
    result = body.data;
  });

  it('Login [POST /api/auth/login]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/auth/login')
      .send({ email: data.email, password: data.password })
      .expect(HttpStatus.CREATED);
    body.data.user.dob = new Date(body.data.user.dob);
    body.data.user.startDate = new Date(body.data.user.startDate);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, position, ...testData } = body.data.user;
    expect(testData).toEqual(jasmine.objectContaining(result));
    expect(body.data).toHaveProperty('accessToken');
    expect(body.data).toHaveProperty('refreshToken');
    login = body.data;
  });

  it('Update profile [PUT /api/auth/profile]', async () => {
    const fakerData = await factoryManager.get(User).make();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { dateLeave, startDate, ...data2 } = fakerData;
    dataUpdate = {
      ...data2,
      password: Example.password,
      retypedPassword: Example.password,
      passwordOld: Example.password,
    };
    const { body } = await request(BaseTest.server)
      .put('/api/auth/profile')
      .set('Authorization', 'Bearer ' + login.accessToken)
      .send(dataUpdate)
      .expect(HttpStatus.OK);
    body.data.user.dob = new Date(body.data.user.dob);
    body.data.user.startDate = new Date(body.data.user.startDate);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, email, phoneNumber, dob, description, avatar } = body.data.user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, retypedPassword, passwordOld, ...test } = dataUpdate;
    expect({ name, email, phoneNumber, dob, description, avatar }).toEqual(jasmine.objectContaining(test));
    expect(body.data).toHaveProperty('accessToken');
    expect(body.data).toHaveProperty('refreshToken');
    login = body.data;
  });

  it('Get profile [GET /api/auth/profile]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/auth/profile')
      .set('Authorization', 'Bearer ' + login.accessToken)
      .expect(HttpStatus.OK);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { position, role, ...testData } = body.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, retypedPassword, passwordOld, ...testData2 } = dataUpdate;
    testData.dob = new Date(testData.dob);
    testData.startDate = new Date(testData.startDate);
    expect(testData).toEqual(jasmine.objectContaining(testData2));
  });

  it('Get profile [GET /api/auth/refresh-token]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/auth/refresh-token')
      .set('Authorization', 'Bearer ' + login.refreshToken)
      .expect(HttpStatus.OK);
    expect(body.data).toHaveProperty('accessToken');
    expect(body.data).toHaveProperty('refreshToken');
  });

  it('Forgotten password [POST /api/auth/forgotten-password]', async () => {
    const fakerData = await factoryManager.get(User).make();

    restPassword = {
      email: fakerData.email,
      password: Example.password,
      retypedPassword: Example.password,
      otp: Example.password,
    };

    const { body } = await request(BaseTest.server)
      .post('/api/auth/forgotten-password')
      .send({ email: login.user.email, notSendEmail: true })
      .expect(HttpStatus.CREATED);
    expect(body).toHaveProperty('data');
    restPassword.email = login.user.email;
    restPassword.otp = body.data;
  });

  it('OTP confirmation [POST /api/auth/otp-confirmation]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/auth/otp-confirmation')
      .send({ email: login.user.email, otp: restPassword.otp })
      .expect(HttpStatus.CREATED);
    expect(body).toHaveProperty('data');
  });

  it('OTP confirmation [POST /api/auth/otp-confirmation]', async () => {
    const { body } = await request(BaseTest.server)
      .post('/api/auth/otp-confirmation')
      .send({ email: login.user.email, otp: restPassword.otp })
      .expect(HttpStatus.CREATED);
    expect(body).toHaveProperty('data');
  });

  it('Reset password [GET /api/auth/logout]', async () => {
    await request(BaseTest.server)
      .get('/api/auth/logout')
      .set('Authorization', 'Bearer ' + login.accessToken)
      .expect(HttpStatus.OK);
  });

  return afterAll(BaseTest.initAfterAll);
};
