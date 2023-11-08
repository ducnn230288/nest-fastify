import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  BookingController,
  DayoffController,
  UserTeamController,
  TaskController,
  TaskTimesheetController,
  TaskWorkController,
  QuestionController,
  QuestionTestController,
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
  QuestionService,
  QuestionTestService,
} from '@service';
import {
  DayoffRepository,
  FileRepository,
  UserRepository,
  UserTeamRepository,
  TaskTimesheetRepository,
  TaskRepository,
  QuestionRepository,
  QuestionTestRepository
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
  controllers: [
    BookingController,
    UserTeamController,
    DayoffController,
    TaskController,
    TaskWorkController,
    TaskTimesheetController,
    QuestionController,
    QuestionTestController
  ],
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
    TaskWorkService,
    TaskTimesheetService,
    TaskTimesheetRepository,
    QuestionRepository,
    QuestionService,
    QuestionTestService,
    QuestionTestRepository
  ],
  exports: [UserTeamRepository, DayoffRepository],
})
export class MemberModule {}
