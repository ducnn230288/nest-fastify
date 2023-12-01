import { setSeederFactory } from 'typeorm-extension';
import { ETaskPriority, Task, ETaskStatus } from '@model';

export default setSeederFactory(Task, (faker) => {
  const data = new Task();

  data.code = faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] });
  data.name = faker.person.jobType();
  data.start = faker.date.past();
  data.deadline = faker.date.future();
  data.priority = ETaskPriority.Normal;
  data.status = ETaskStatus.Processing;
  data.level = faker.number.int({ min: 1, max: 12 });
  data.order = faker.number.int({ min: 1, max: 12 });
  data.complete = faker.number.int({ min: 1, max: 60 });
  data.successors = 'T1,T2';
  data.predecessors = 'T3,T4';

  return data;
});
