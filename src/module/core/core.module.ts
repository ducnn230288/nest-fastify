import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CodeController,
  CodeTypeController,
  DataController,
  DataTypeController,
  ParameterController,
  PostController,
  PostTypeController,
} from '@controller';
import { Code, CodeType, Data, DataTranslation, DataType, Parameter, Post, PostTranslation, PostType } from '@model';
import {
  CodeService,
  CodeTypeService,
  DataService,
  DataTypeService,
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
    ParameterRepository,
    ParameterService,
    PostRepository,
    PostService,
    PostTypeService,
    PostTranslationRepository,
  ],
})
export class CoreModule {}
