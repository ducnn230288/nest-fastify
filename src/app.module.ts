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
        watch: process.env.NODE_ENV !== 'production',
      },
      resolvers: [{ use: QueryResolver, options: ['Accept-Language'] }, AcceptLanguageResolver],
      viewEngine: 'hbs',
    }),
    // ServeStaticModule.forRoot(
    //   (() => {
    //     const publicDir = resolve('./uploads/');
    //     const servePath = '/files';
    //     return {
    //       rootPath: publicDir,
    //       serveRoot: servePath,
    //       exclude: ['/api*'],
    //     };
    //   })(),
    // ),
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'postgres',
    //     host: process.env.DATABASE_HOST,
    //     port: +process.env.DATABASE_PORT,
    //     username: process.env.DATABASE_USER,
    //     password: process.env.DATABASE_PASSWORD,
    //     database: process.env.DATABASE_NAME,
    //     autoLoadEntities: true,
    //     synchronize: process.env.NODE_ENV !== 'prod',
    //   }),
    // }),
  ],
})
export class AppModule {
  constructor() {
    cloudinary.v2.config(cloudinaryConfig);
  }
}
