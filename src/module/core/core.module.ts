import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  Code,
  CodeType,
  Data,
  DataTranslation,
  DataType,
  File,
  Parameter,
  Post,
  PostTranslation,
  PostType,
} from '@model';
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
  CodeTypeRepository,
  DataRepository,
  ParameterRepository,
  PostRepository,
  PostTranslationRepository,
} from '@repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Code,
      CodeType,
      Data,
      DataTranslation,
      DataType,
      File,
      Parameter,
      Post,
      PostType,
      PostTranslation,
    ]),
  ],
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
    CodeService,
    CodeTypeRepository,
    CodeTypeService,
    DataRepository,
    DataService,
    DataTypeService,
    FileService,
    ParameterRepository,
    ParameterService,
    PostRepository,
    PostService,
    PostTypeService,
    PostTranslationRepository,
  ],
})
export class CoreModule {}
