import SMTPConnection = require('nodemailer/lib/smtp-connection');
import { appConfig } from './config';
import { MailerOptions } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

// https://nest-modules.github.io/mailer/docs/mailer
export const mailerTransportOptions: SMTPConnection.Options = {
  host: appConfig.SMTP_HOST,
  port: appConfig.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: appConfig.SMTP_USER,
    pass: appConfig.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

export const mailerOptions: MailerOptions = {
  transport: mailerTransportOptions,
  defaults: {
    from: appConfig.MAIL_SENDER,
  },
  template: {
    dir: './other/templates',
    // adapter: new HandlebarsAdapter(), // or new PugAdapter()
    options: {
      strict: true,
    },
  },
};
