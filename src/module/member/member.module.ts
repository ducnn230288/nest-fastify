import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingController, DayoffController, UserTeamController, TaskController } from '@controller';
import { Booking, DayOff, Question, QuestionTest, Task, TaskTimesheet, TaskWork, UserTeam } from '@model';
import { BookingService, DayoffService, FileService, TaskService, UserService, UserTeamService } from '@service';
import { DayoffRepository, FileRepository, UserRepository, UserTeamRepository } from '@repository';
import { Comment } from './model/comment';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      UserTeam,
      DayOff,
      Question,
      QuestionTest,
      TaskTimesheet,
      TaskWork,
      Task,
      Comment,
    ]),
  ],
  controllers: [BookingController, UserTeamController, DayoffController, TaskController],
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
    TaskService,
  ],
  exports: [UserTeamRepository, DayoffRepository],
})
export class MemberModule {}
