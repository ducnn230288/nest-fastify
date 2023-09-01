import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import secureSession from '@fastify/secure-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { appConfig } from './config/config';
import { loggerOptions } from './config/logger.config';
import { HttpExceptionFilter } from './shared/filter/http-exception-filter';
import { join } from 'path';

async function bootstrap(): Promise<void> {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: WinstonModule.createLogger(loggerOptions),
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.register(helmet);
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

  app.enableCors({
    origin: appConfig.CORS_ALLOWED_ORIGNS,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // use cookies
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.register(secureSession, { secret: appConfig.SESSION_SECRET, salt: appConfig.SESSION_SALT });

  // http://localhost:9002/swagger
  if (appConfig.NODE_ENV !== 'prod') {
    const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('NestJS starter')
      .setDescription('NestJS starter API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  const port = appConfig.SERVER_PORT;
  if (!port) {
    logger.error('Server Port is undefined');
    return;
  }

  await app.listen(port, '0.0.0.0');
  logger.verbose(`Application running on port ${port}, NODE_ENV: ${appConfig.NODE_ENV}`);
}
bootstrap();
