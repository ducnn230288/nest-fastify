import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { appConfig } from '@config';

import { ContactRequestDto } from '@dto';
import { User } from '@model';

@Injectable()
export class EmailService {
  private logger = new Logger('EmailService');

  constructor(private readonly mailerService: MailerService) {}

  /**
   *
   * @param user
   * @param token
   * @returns void
   *
   */
  async sendUserConfirmation(user: User, token: string): Promise<void> {
    try {
      const info = await this.mailerService.sendMail({
        to: user.email,
        from: '"ARI TECHNOLOGY" <' + appConfig.MAIL_SENDER + '>',
        subject: 'Welcome to Ari! We got a request to Reset Password',
        template: './confirmation',
        context: {
          name: user.name,
          token: token,
        },
      });
      this.logger.verbose(`Response Send email: ${JSON.stringify(info)}`);
      return info;
    } catch (error) {
      this.logger.error(`Failed to send reset password email to ${user.email}`, error.stack);
    }
  }

  /**
   *
   * @param context
   * @returns void
   *
   */
  async sendUserContact(context: ContactRequestDto): Promise<void> {
    try {
      const info = await this.mailerService.sendMail({
        to: appConfig.MAIL_SENDER,
        from: '"ARI TECHNOLOGY" <' + appConfig.MAIL_SENDER + '>',
        subject: 'We got a request to Contact',
        template: './contact',
        context,
      });
      this.logger.verbose(`Response Send email: ${JSON.stringify(info)}`);
      return info;
    } catch (error) {
      this.logger.error(`Failed to send temporary password email to ${appConfig.MAIL_SENDER}`, error.stack);
    }
  }
}
