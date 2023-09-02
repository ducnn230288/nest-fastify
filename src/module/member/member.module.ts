import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingRoomController, DayoffController, UserTeamController } from '@controller';
import { BookingRoom, DayOff, Room, UserTeam } from '@model';
import { BookingRoomService, DayoffService, UserService, UserTeamService } from '@service';
import { DayoffRepository, UserRepository, UserTeamRepository } from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookingRoom, DayOff, Room, UserTeam])],
  controllers: [BookingRoomController, DayoffController, UserTeamController],
  providers: [
    BookingRoomService,
    DayoffRepository,
    DayoffService,
    UserTeamRepository,
    UserRepository,
    UserService,
    UserTeamService,
  ],
})
export class MemberModule {}
