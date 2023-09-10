import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingRoomController, DayoffController, UserTeamController } from '@controller';
import { BookingRoom, DayOff, Room, UserTeam } from '@model';
import { BookingRoomService, DayoffService, FileService, UserService, UserTeamService } from '@service';
import { DayoffRepository, FileRepository, UserRepository, UserTeamRepository } from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookingRoom, Room, UserTeam, DayOff])],
  controllers: [BookingRoomController, UserTeamController, DayoffController],
  providers: [
    BookingRoomService,
    UserTeamRepository,
    UserTeamService,
    DayoffRepository,
    DayoffService,
    FileRepository,
    FileService,
    UserService,
    UserRepository,
  ],
})
export class MemberModule {}