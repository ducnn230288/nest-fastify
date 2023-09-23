import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { FileService, UserService } from '@service';
import { DayoffRepository, FileRepository, UserRepository, UserTeamRepository } from '@repository';

@Module({
  providers: [
    SchedulerService,
    FileService,
    FileRepository,
    UserService,
    UserRepository,
    DayoffRepository,
    UserTeamRepository,
  ],
  imports: [ScheduleModule.forRoot()],
})
export class SchedulerModule {}
