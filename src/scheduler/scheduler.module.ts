import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { FileService } from '@service';
import { FileRepository } from '@repository';

@Module({
  providers: [SchedulerService, FileService, FileRepository],
  imports: [ScheduleModule.forRoot()],
})
export class SchedulerModule {}
