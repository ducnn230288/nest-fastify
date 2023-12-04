import { setSeederFactory } from 'typeorm-extension';
import { TaskSub } from '@model';

export default setSeederFactory(TaskSub, (faker) => {
  const data = new TaskSub();
  data.name = faker.person.jobType();
  data.image = faker.image.url();
  return data;
});
