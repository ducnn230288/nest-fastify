import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingRoomController, DayoffController, UserTeamController } from '@controller';
import { BookingRoom, DayOff, Room, UserTeam } from '@model';
import { BookingRoomService, DayoffService, UserTeamService } from '@service';
import { DayoffRepository, UserTeamRepository } from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookingRoom, DayOff, Room, UserTeam])],
  controllers: [BookingRoomController, DayoffController, UserTeamController],
  providers: [BookingRoomService, DayoffRepository, DayoffService, UserTeamRepository, UserTeamService],
})
export class MemberModule {}
