import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';

@Module({
  imports: [
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
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
