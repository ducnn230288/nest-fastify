import { BadRequestException, Injectable } from '@nestjs/common';
import { Task, User } from '@model';
import { BaseService } from '@shared';
import { TaskRepository, UserRepository } from '@repository';
import { CreateTaskRequestDto, UpdateTaskRequestDto } from '@dto';
import { I18nContext } from 'nestjs-i18n';
import { ETaskStatus } from '@model';

export const P_TASK_LISTED = '80668128-7e1d-46ef-95d1-bb4cff742f10';
export const P_TASK_DETAIL = 'bd11ca07-2cf4-473f-ac43-50b0eac57710';
export const P_TASK_CREATE = 'becacb61-46c5-445e-bce4-0f3a2cfed510';
export const P_TASK_UPDATE = '972e4159-e3ce-416e-a526-ffd83039e010';
export const P_TASK_DELETE = 'cdece61b-f159-4dec-8b27-b7de50c9b810';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(
    public repo: TaskRepository,
    private readonly repoUser: UserRepository, // private readonly codeService: CodeService,
  ) {
    super(repo);
    this.listQuery = [];
    this.listJoin = ['manager', 'works'];
    this.listJoinCount = [];
    this.joinColumn = ['assignees'];
  }

  async createTask(body: CreateTaskRequestDto, user: User): Promise<Task | null> {
    const i18n = I18nContext.current()!;
    if (!user.id) throw new BadRequestException(i18n.t('common.User id not found', { args: { id: user.id } }));

    const { assigneeIds, ...data } = body;
    const assignees: User[] = await this.repoUser.getManyByArrayId(assigneeIds);
    if (!assignees || assignees.length !== body.assigneeIds.length)
      throw new BadRequestException(i18n.t('common.User ids not found'));

    /**
     * Khi tạo task thì manager sẽ giao cho những User mà manager quản lý hay sao
     */
    const task = await this.repo.create({ ...data, managerId: user.id });
    task.assignees = assignees;

    return await this.repo.save(task);
  }

  async updateTask(id: string, status: number, body: UpdateTaskRequestDto | null): Promise<Task | null> {
    let newTask: Task | null;
    const i18n = I18nContext.current()!;
    const task = await this.findOne(id);
    if (!task) throw new BadRequestException(i18n.t('Common.Task.id was not found'));

    if (task.finish || task.status === ETaskStatus.Complete || task.complete === 100)
      throw new BadRequestException(i18n.t('Common.Task was finished'));

    if (status === ETaskStatus.Processing) newTask = await this.update(task.id!, body!);
    else if (status === ETaskStatus.Cancel) newTask = await this.update(task.id!, { status: ETaskStatus.Cancel });
    else {
      const hours = task.works?.reduce((init, curr) => init + curr.hours!, 0);
      newTask = await this.update(task.id!, {
        finish: new Date(),
        hours,
        status: ETaskStatus.Complete,
        complete: 100,
      });
    }

    return newTask;
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
