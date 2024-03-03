import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FileService } from '@service';
// import { CronJob } from 'cron';

@Injectable()
export class SchedulerService {
  private logger = new Logger('SchedulerService');
  constructor(
    public fileService: FileService,
    // private schedulerRegistry: SchedulerRegistry,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async clearFiles(): Promise<void> {
    this.logger.verbose(`Clear Files successfully`);
    const [list] = await this.fileService.findAll({ filter: '{ status: 0 }' });
    for (const data of list) {
      if (data) await this.fileService.removeFile(data);
    }
  }

  // getCrons() {
  //   const jobs = this.schedulerRegistry.getCronJobs();
  //   jobs.forEach((value, key, map) => {
  //     let next;
  //     try {
  //       next = value.nextDates().toUTC();
  //     } catch (e) {
  //       next = 'error: next fire date is in the past!';
  //     }
  //     this.logger.log(`job: ${key} -> next: ${next}`);
  //   });
  // }
  //
  // addCronJob(name: string, seconds: string) {
  //   const job = new CronJob(`${seconds} * * * * *`, () => {
  //     this.logger.warn(`time (${seconds}) for job ${name} to run!`);
  //   });
  //
  //   this.schedulerRegistry.addCronJob(name, job);
  //   job.start();
  //
  //   this.logger.warn(`job ${name} added for each minute at ${seconds} seconds!`);
  // }
  //
  // deleteCron(name: string) {
  //   this.schedulerRegistry.deleteCronJob(name);
  //   this.logger.warn(`job ${name} deleted!`);
  // }
}
