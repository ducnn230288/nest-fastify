import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { resolve } from 'path';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@controller';
import { appConfig, DbCustomLogger, loggerOptions } from '@config';
import { NotificationModule, CoreModule, UserModule, MemberModule } from '@module';

@Module({
  controllers: [AppController],
  imports: [
    WinstonModule.forRoot(loggerOptions),
    NotificationModule,
    UserModule,
    CoreModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: resolve('./other/translations'),
        watch: appConfig.NODE_ENV !== 'production',
      },
      resolvers: [{ use: QueryResolver, options: ['Accept-Language'] }, AcceptLanguageResolver],
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
        logger: appConfig.NODE_ENV !== 'production' ? 'advanced-console' : new DbCustomLogger(),
      }),
    }),
    MemberModule,
  ],
})
export class AppModule {}
