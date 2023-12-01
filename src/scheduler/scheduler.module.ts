import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { FileService, TaskService, UserService } from '@service';
import { DayoffRepository, FileRepository, TaskRepository, UserRepository, UserTeamRepository } from '@repository';

@Module({
  providers: [
    SchedulerService,
    FileService,
    FileRepository,
    UserService,
    UserRepository,
    DayoffRepository,
    UserTeamRepository,
    TaskService,
    TaskRepository,
  ],
  imports: [ScheduleModule.forRoot()],
})
export class SchedulerModule {}
