import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  BookingController,
  DayoffController,
  UserTeamController,
  TaskController,
  TaskTimesheetController,
  QuestionController,
  QuestionTestController,
  TaskSubController,
} from '@controller';
import {
  Booking,
  Code,
  Comment,
  DayOff,
  Question,
  QuestionTest,
  Task,
  TaskSub,
  TaskTimesheet,
  TaskWork,
  UserTeam,
} from '@model';
import {
  BookingService,
  DayoffService,
  FileService,
  TaskService,
  TaskTimesheetService,
  UserService,
  UserTeamService,
  QuestionService,
  QuestionTestService,
  TaskWorkService,
  CodeService,
  TaskSubService,
} from '@service';
import {
  DayoffRepository,
  FileRepository,
  UserRepository,
  UserTeamRepository,
  TaskTimesheetRepository,
  TaskRepository,
  QuestionRepository,
  QuestionTestRepository,
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
      Code,
      TaskSub,
    ]),
  ],
  controllers: [
    BookingController,
    UserTeamController,
    DayoffController,
    TaskController,
    TaskTimesheetController,
    QuestionController,
    QuestionTestController,
    TaskSubController,
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
    TaskTimesheetService,
    TaskTimesheetRepository,
    TaskWorkService,
    TaskSubService,
    QuestionRepository,
    QuestionService,
    QuestionTestService,
    QuestionTestRepository,

    CodeService,
  ],
  exports: [UserTeamRepository, DayoffRepository],
})
export class MemberModule {}
