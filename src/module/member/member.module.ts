import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingController, DayoffController, UserTeamController } from '@controller';
import { Booking, DayOff, UserTeam } from '@model';
import { BookingService, DayoffService, FileService, UserService, UserTeamService } from '@service';
import { DayoffRepository, FileRepository, UserRepository, UserTeamRepository } from '@repository';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, UserTeam, DayOff])],
  controllers: [BookingController, UserTeamController, DayoffController],
  providers: [
    BookingService,
    UserTeamRepository,
    UserTeamService,
    DayoffRepository,
    DayoffService,
    FileRepository,
    FileService,
    UserService,
    UserRepository,
  ],
  exports: [UserTeamRepository, DayoffRepository],
})
export class MemberModule {}
