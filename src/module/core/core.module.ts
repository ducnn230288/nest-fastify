import { Module } from '@nestjs/common';

import {
  CodeController,
  CodeTypeController,
  DataController,
  DataTypeController,
  FileController,
  ParameterController,
  PostController,
  PostTypeController,
} from '@controller';
import {
  CodeService,
  CodeTypeService,
  DataService,
  DataTypeService,
  FileService,
  ParameterService,
  PostService,
  PostTypeService,
} from '@service';
import {
  CodeRepository,
  CodeTypeRepository,
  DataRepository,
  DataTypeRepository,
  FileRepository,
  ParameterRepository,
  PostRepository,
  PostTranslationRepository,
  PostTypeRepository,
} from '@repository';

@Module({
  imports: [],
  controllers: [
    CodeController,
    CodeTypeController,
    DataController,
    DataTypeController,
    FileController,
    ParameterController,
    PostController,
    PostTypeController,
  ],
  providers: [
    CodeRepository,
    CodeService,
    CodeTypeRepository,
    CodeTypeService,
    DataRepository,
    DataService,
    DataTypeRepository,
    DataTypeService,
    FileRepository,
    FileService,
    ParameterRepository,
    ParameterService,
    PostRepository,
    PostService,
    PostTypeService,
    PostTypeRepository,
    PostTranslationRepository,
  ],
  exports: [DataService, FileService, ParameterService, PostService],
})
export class CoreModule {}
