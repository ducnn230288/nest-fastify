import { Injectable } from '@nestjs/common';

import { Booking } from '@model';
import { BaseService } from '@shared';
import { BookingRepository } from '@repository';

export const P_BOOKING_LISTED = '941f5380-cfde-4bdf-9400-c6b3964c82ce';
export const P_BOOKING_DETAIL = '50267915-c98b-46a8-a310-ffa9f0aa00d3';
export const P_BOOKING_CREATE = '5416d154-4c0a-498f-8f0f-d941543db082';
export const P_BOOKING_UPDATE = '8f2ff690-32a1-4d9a-a4a0-91e5f934c71b';
export const P_BOOKING_DELETE = '8c93d8f8-7db8-4a4c-a5e6-1cb0f53cc684';

@Injectable()
export class BookingService extends BaseService<Booking> {
  constructor(public repo: BookingRepository) {
    super(repo);
    this.listJoin = ['item', 'user'];
  }

  /**
   *
   * @param bookingRoomReqest
   * @param i18n
   * @returns BookingRoom
   *
   */
  // async create(bookingRoomReqest: CreateBookingRoomRequestDto, i18n: I18nContext) {
  //   const bookingRoom = this.repo.create(bookingRoomReqest);
  //   return await this.repo.save(bookingRoom);
  // }
}
