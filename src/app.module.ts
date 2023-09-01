import { Module } from '@nestjs/common';
import cloudinary from 'cloudinary';
import { WinstonModule } from 'nest-winston';
import { cloudinaryConfig } from './config/cloudinary.config';
import { loggerOptions } from './config/logger.config';
import { NotificationModule } from './notification/notification.module';
import { StorageModule } from './storage/storage.module';
import { AppController } from './app.controller';

@Module({
  imports: [WinstonModule.forRoot(loggerOptions), NotificationModule, StorageModule],
  controllers: [AppController],
})
export class AppModule {
  constructor() {
    cloudinary.v2.config(cloudinaryConfig);
  }
}
