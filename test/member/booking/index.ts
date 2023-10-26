/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { useSeederFactoryManager } from 'typeorm-extension';

import '@factories';
import { BaseTest } from '@test';
import { CreateBookingRequestDto, UpdateBookingRequestDto } from '@dto';
import { Booking, CodeType, Code } from '@model';
import { CodeService, CodeTypeService } from '@service';

export const testCase = (type?: string, permissions: string[] = []): void => {
  beforeAll(() => BaseTest.initBeforeAll(type, permissions));
  const factoryManager = useSeederFactoryManager();

  let dataBooking: CreateBookingRequestDto;
  let dataUpdate: UpdateBookingRequestDto;
  let resultBooking: Booking | null;

  let codeType: CodeType | null;
  let code: Code | null;

  it('Create [POST api/booking]', async () => {
    codeType = await BaseTest.moduleFixture!.get(CodeTypeService).create(await factoryManager.get(CodeType).make());

    code = await BaseTest.moduleFixture!.get(CodeService).create(
      await factoryManager.get(Code).make({
        type: codeType?.code,
      }),
    );

    dataBooking = await factoryManager.get(Booking).make({
      typeCode: codeType?.code,
      itemCode: code?.code,
    });

    const { body } = await request(BaseTest.server)
      .post('/api/booking')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataBooking)
      .expect(type ? HttpStatus.CREATED : HttpStatus.FORBIDDEN);

    if (type) {
      const { startTime, endTime, ...test } = dataBooking;
      expect(body.data).toEqual(jasmine.objectContaining(test));
      resultBooking = body.data;
    }
  });

  it('Get all [GET api/booking]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/booking')
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data[0]).toEqual(jasmine.objectContaining(resultBooking));
    }
  });

  it('Get one [POST api/booking/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .get('/api/booking/' + resultBooking?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      expect(body.data).toEqual(jasmine.objectContaining(resultBooking));
    }
  });

  it('Update [PUT api/booking]', async () => {
    dataUpdate = await factoryManager.get(Booking).make();

    const { body } = await request(BaseTest.server)
      .put('/api/booking/' + resultBooking?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .send(dataUpdate)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { startTime, endTime, ...test } = dataUpdate;
      expect(body.data).toEqual(jasmine.objectContaining(test));
      expect(body.data.startTime).toEqual(startTime.toISOString());
      expect(body.data.endTime).toEqual(endTime.toISOString());
      resultBooking = body.data;
    }
  });

  it('Delete [DELETE api/booking/:id]', async () => {
    const { body } = await request(BaseTest.server)
      .delete('/api/booking/' + resultBooking?.id)
      .set('Authorization', 'Bearer ' + BaseTest.token)
      .expect(type ? HttpStatus.OK : HttpStatus.FORBIDDEN);

    if (type) {
      const { updatedAt, ...test } = resultBooking!;
      expect(body.data).toEqual(jasmine.objectContaining(test));
    }
  });

  return afterAll(BaseTest.initAfterAll);
};
