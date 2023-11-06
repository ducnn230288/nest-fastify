import { setSeederFactory } from 'typeorm-extension';
import { TaskWork } from '@model';

export default setSeederFactory(TaskWork, (faker) => {
  const data = new TaskWork();

  data.hours = faker.number.int();

  return data;
});
