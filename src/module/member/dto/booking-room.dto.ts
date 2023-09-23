import { PickType } from '@nestjs/swagger';
import { BookingRoom } from '@model';

export class CreateBookingRoomRequestDto extends PickType(BookingRoom, [
  'bookDate',
  'startTime',
  'endTime',
  'description',
  'meetingName',
  'userId',
  'roomCode',
] as const) {}
