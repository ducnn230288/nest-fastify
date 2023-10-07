import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { resolve } from 'path';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

import { AppController } from '@controller';
import { appConfig, DbCustomLogger, loggerOptions } from '@config';
import { NotificationModule, SchedulerModule, CoreModule, UserModule } from '@module';

@Module({
  controllers: [AppController],
  imports: [
    WinstonModule.forRoot(loggerOptions),
    NotificationModule,
    SchedulerModule,
    CoreModule,
    UserModule,
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
        autoLoadEntities: appConfig.NODE_ENV !== 'prod',
        synchronize: appConfig.NODE_ENV !== 'prod',
        logging: ['error'],
        logger: appConfig.NODE_ENV !== 'prod' ? 'advanced-console' : new DbCustomLogger(),
      }),
    }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: appConfig.REDIS_HOST,
            port: 6379,
          },
          ttl: 3600 * 1000,
        }),
      }),
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
