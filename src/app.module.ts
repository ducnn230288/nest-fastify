import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { resolve } from 'path';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

import { AppController } from '@controller';
import { appConfig, DbCustomLogger, loggerOptions } from '@config';
import {
  // NotificationModule,
  SchedulerModule,
  CoreModule,
  UserModule,
  ProductModule,
} from '@module';
import { NamingStrategy } from '@shared';

@Module({
  controllers: [AppController],
  imports: [
    WinstonModule.forRoot(loggerOptions),
    // NotificationModule,
    SchedulerModule,
    UserModule,
    CoreModule,
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
        database: appConfig.NODE_ENV !== 'test' ? appConfig.DATABASE_NAME : 'postgres',
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.{entity,model}.{js,ts}'],
        synchronize: appConfig.NODE_ENV !== 'prod',
        logging: ['error'],
        logger: appConfig.NODE_ENV !== 'prod' ? 'advanced-console' : new DbCustomLogger(),
        namingStrategy: new NamingStrategy(),
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
    ProductModule,
  ],
})
export class AppModule {}
