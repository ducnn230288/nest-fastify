import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import secureSession from '@fastify/secure-session';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { join } from 'path';
import hbs from 'hbs';
import hbsUtils from 'hbs-utils';

import { appConfig, loggerOptions, setupSwagger } from '@config';
import { HttpExceptionFilter } from '@shared';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: WinstonModule.createLogger(loggerOptions),
    cors: true,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.register(helmet, { crossOriginResourcePolicy: false, contentSecurityPolicy: false });
  // Fastify file upload
  const options = {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 1000000, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: 100000000, // For multipart forms, the max file size
      files: 1, // Max number of file fields
      headerPairs: 2000, // Max number of header key=>value pairs
    },
  };
  await app.register(multipart, options);
  // app.enableCors({
  //   origin: appConfig.DOMAIN_FE,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true, // use cookies
  // });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableShutdownHooks();

  await app.register(secureSession, { secret: appConfig.ACCESS_SECRET, salt: appConfig.SESSION_SALT });
  app.useStaticAssets({ root: join(process.cwd(), './other', 'public') });
  hbs.registerPartials(join(process.cwd(), './other', '/views/layouts'));
  hbs.registerHelper('json', function (context) {
    return JSON.stringify(context);
  });
  hbs.registerHelper('raw-helper', function (options) {
    return options.fn();
  });
  hbsUtils(hbs).registerWatchedPartials(join(process.cwd(), './other', '/views/layouts'));
  app.setViewEngine({
    engine: { handlebars: hbs },
    includeViewExtension: true,
    templates: join(process.cwd(), './other', 'views'),
  });

  const port = appConfig.SERVER_PORT;
  if (!port) {
    logger.error('Server Port is undefined');
    return;
  }
  if (appConfig.NODE_ENV !== 'prod') setupSwagger(app);

  await app.listen(port, '0.0.0.0');
  logger.verbose(`Application running on port ${port}, NODE_ENV: ${appConfig.NODE_ENV}`);
}
bootstrap();
