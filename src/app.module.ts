import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { resolve } from 'path';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@controller';
import { appConfig, DbCustomLogger, loggerOptions } from '@config';
import { NotificationModule, SchedulerModule, CoreModule, UserModule, MemberModule } from '@module';

@Module({
  controllers: [AppController],
  imports: [
    WinstonModule.forRoot(loggerOptions),
    NotificationModule,
    SchedulerModule,
    CoreModule,
    UserModule,
    I18nModule.forRoot({
      fallbackLanguage: 'vn',
      fallbacks: {
        'vi-*': 'vn',
        'en-*': 'en',
      },
      loaderOptions: {
        path: resolve('./other/translations'),
        watch: appConfig.NODE_ENV !== 'prod',
      },
      resolvers: [
        { use: QueryResolver, options: ['Accept-Language'] },
        new HeaderResolver(),
        AcceptLanguageResolver,
        new CookieResolver(),
      ],
      viewEngine: 'hbs',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: appConfig.DATABASE_HOST,
        port: appConfig.DATABASE_PORT,
        username: appConfig.DATABASE_USER,
        password: appConfig.DATABASE_PASSWORD,
        database: appConfig.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: appConfig.NODE_ENV !== 'prod',
        logging: ['error'],
        logger: appConfig.NODE_ENV !== 'prod' ? 'advanced-console' : new DbCustomLogger(),
      }),
    }),
    MemberModule,
  ],
})
export class AppModule {}
