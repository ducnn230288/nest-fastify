import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  BookingController,
  DayoffController,
  UserTeamController,
  TaskController,
  TaskTimesheetController,
  TaskWorkController,
} from '@controller';
import { Booking, DayOff, Question, QuestionTest, Task, TaskTimesheet, TaskWork, UserTeam } from '@model';
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
} from '@repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, UserTeam, DayOff, Question, QuestionTest, TaskTimesheet, TaskWork, Task]),
  ],
  controllers: [
    BookingController,
    UserTeamController,
    DayoffController,
    TaskController,
    TaskWorkController,
    TaskTimesheetController,
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
  ],
  exports: [UserTeamRepository, DayoffRepository],
})
export class MemberModule {}
