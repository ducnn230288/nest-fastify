import { Injectable } from '@nestjs/common';
import { Task } from '@model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(
    @InjectRepository(Task)
    public repo: Repository<Task>,
  ) {
    super(repo);
    // this.listQuery = ['name', 'description'];
    // this.listJoin = ['manager'];
    // this.listJoinCount = [{ name: 'countUser', key: 'users' }];
  }
}
