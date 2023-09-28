import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { resolve } from 'path';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@controller';
import { appConfig, DbCustomLogger, loggerOptions } from '@config';
import { NotificationModule, SchedulerModule, CoreModule, UserModule, StoreModule, AddressModule } from '@module';

@Module({
  controllers: [AppController],
  imports: [
    WinstonModule.forRoot(loggerOptions),
    NotificationModule,
    SchedulerModule,
    CoreModule,
    UserModule,
    StoreModule,
    AddressModule,
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'vn',
        loaderOptions: {
          path: resolve('./other/translations'),
          watch: appConfig.NODE_ENV !== 'prod',
        },
        viewEngine: 'hbs',
      }),
      resolvers: [AcceptLanguageResolver],
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
  ],
})
export class AppModule {}
