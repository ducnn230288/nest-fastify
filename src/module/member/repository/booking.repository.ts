import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@shared';
import { Booking } from '@model';

@Injectable()
export class BookingRepository extends BaseRepository<Booking> {
  constructor(private readonly dataSource: DataSource) {
    super(Booking, dataSource.createEntityManager());
  }
}
