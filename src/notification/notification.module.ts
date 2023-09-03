import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { mailerOptions } from '@config';
import { EmailService } from '@service';

@Module({
  imports: [MailerModule.forRoot(mailerOptions)],
  providers: [EmailService],
  exports: [EmailService],
})
export class NotificationModule {}
