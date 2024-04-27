import { Module } from '@nestjs/common';

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
  BookingRepository,
  TaskSubRepository,
  CodeRepository,
} from '@repository';
import { TaskWorkRepository } from './repository/task-work.repository';

@Module({
  imports: [],
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
    BookingRepository,
    BookingService,
    DayoffRepository,
    DayoffService,
    QuestionRepository,
    QuestionService,
    QuestionTestService,
    QuestionTestRepository,
    UserTeamRepository,
    UserTeamService,
    TaskService,
    TaskRepository,
    TaskTimesheetRepository,
    TaskTimesheetService,
    TaskWorkRepository,
    TaskWorkService,
    TaskSubRepository,
    TaskSubService,

    FileRepository,
    FileService,
    UserRepository,
    UserService,
    CodeRepository,
    CodeService,
  ],
  exports: [UserTeamRepository, DayoffRepository],
})
export class MemberModule {}
