import { setSeederFactory } from 'typeorm-extension';
import { TaskTimesheet } from '@model';

export default setSeederFactory(TaskTimesheet, (faker) => {
  const data = new TaskTimesheet();

  data.start = faker.date.past();
  data.finish = faker.date.future();

  return data;
});
