import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  BookingController,
  DayoffController,
  UserTeamController,
  TaskController,
  TaskTimesheetController,
} from '@controller';
import { Booking, Comment, DayOff, Question, QuestionTest, Task, TaskTimesheet, TaskWork, UserTeam } from '@model';
import {
  BookingService,
  DayoffService,
  FileService,
  TaskService,
  TaskTimesheetService,
  UserService,
  UserTeamService,
  TaskWorkService,
} from '@service';
import {
  DayoffRepository,
  FileRepository,
  UserRepository,
  UserTeamRepository,
  TaskTimesheetRepository,
  TaskRepository,
  TaskWorkRepository,
} from '@repository';

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
  controllers: [BookingController, UserTeamController, DayoffController, TaskController, TaskTimesheetController],
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
    TaskRepository,
    TaskTimesheetService,
    TaskTimesheetRepository,
    TaskWorkService,
    TaskWorkRepository,
  ],
  exports: [UserTeamRepository, DayoffRepository],
})
export class MemberModule {}
