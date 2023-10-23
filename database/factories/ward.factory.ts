import { setSeederFactory } from 'typeorm-extension';
import { Ward } from '@model';

export default setSeederFactory(Ward, (faker) => {
  const data = new Ward();
  // data.code = faker.string.numeric(5);
  data.code = '00001';

  data.name = faker.location.city();

  return data;
});
