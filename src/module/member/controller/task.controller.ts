import { Body, Get, Post } from '@nestjs/common';
import { Auth, AuthUser, Headers, MaxGroup, SerializerBody } from '@shared';
import { TaskService } from '@service';
import { CreateTaskRequestDto } from '@dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { User } from '@model';

@Headers('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Auth({
    summary: 'Create task',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: CreateTaskRequestDto,
    // @AuthUser() user: User,
  ): Promise<any> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }
}
