import { Module } from '@nestjs/common';
import cloudinary from 'cloudinary';
import { WinstonModule } from 'nest-winston';
import { cloudinaryConfig } from './config/cloudinary.config';
import { loggerOptions } from './config/logger.config';
import { NotificationModule } from './notification/notification.module';
import { StorageModule } from './storage/storage.module';
import { AppController } from './app.controller';
import { resolve } from 'path';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { appConfig } from '@config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AppController],
  imports: [
    WinstonModule.forRoot(loggerOptions),
    NotificationModule,
    StorageModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: resolve('./translations'),
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
      }),
    }),
  ],
})
export class AppModule {
  constructor() {
    cloudinary.v2.config(cloudinaryConfig);
  }
}
