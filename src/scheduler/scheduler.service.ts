import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FileService } from '@service';

@Injectable()
export class SchedulerService {
  private logger = new Logger('SchedulerService');
  constructor(public fileService: FileService) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async clearFiles(): Promise<void> {
    this.logger.verbose(`Clear Files successfully`);
    const [list] = await this.fileService.findAll({ filter: { status: 0 } });
    for (const data of list) {
      if (data) await this.fileService.removeFile(data);
    }
  }
}
