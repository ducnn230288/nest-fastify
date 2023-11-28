import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@model';
import { BaseService } from '@shared';
import { TaskRepository } from '@repository';
import { UpdateTaskRequestDto } from '../dto/task.dto';
import { I18nContext } from 'nestjs-i18n';
import { EStatus } from '@model';

export const P_TASK_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f10';
export const P_TASK_DETAIL = 'bd11ca07-2cf4-473f-ac43-50b0eac57710';
export const P_TASK_CREATE = 'becacb61-46c5-445e-bce4-0f3a2cfed510';
export const P_TASK_UPDATE = '972e4159-e3ce-416e-a526-ffd83039e010';
export const P_TASK_DELETE = 'cdece61b-f159-4dec-8b27-b7de50c9b810';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(public repo: TaskRepository) {
    super(repo);
    this.listQuery = [];
    this.listJoin = ['manager', 'works', 'assignees'];
    this.listJoinCount = [];
  }

  async updateTask(id: string, body: UpdateTaskRequestDto): Promise<Task | null> {
    const data = await this.update(id, body);
    const taskData = await this.findOne(id, []);

    const i18n = I18nContext.current()!;
    if (taskData?.status === EStatus.Complete) throw new BadRequestException(i18n.t('Common.This task Completed'));
    return data;
  }

  async getManyIn30Day(): Promise<Task[]> {
    const listTask = await this.repo.getManyIn30Day();
    const resultList = listTask.map((task) => {
      task.hours = task.works?.reduce((init, curr) => init! + curr!.hours! + 1, 0);
      return task;
    });

    return this.repo.save(resultList);
  }
}
