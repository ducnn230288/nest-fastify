import { setSeederFactory } from 'typeorm-extension';
import { Task } from '@model';

export default setSeederFactory(Task, (faker) => {
  const data = new Task();

  data.code = faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] });
  data.name = faker.person.jobType();
  data.start = faker.date.past();
  data.finish = faker.date.future();
  data.deadline = faker.date.future();
  data.priority = faker.number.int({ min: -1, max: 1 });
  data.level = faker.number.int({ min: 1, max: 12 });
  data.complete = faker.number.int({ min: 1, max: 100 });
  data.successors = 'T1,T2';
  data.predecessors = 'T3,T4';
  data.hours = faker.number.int();

  data.name = faker.location.city();

  return data;
});
