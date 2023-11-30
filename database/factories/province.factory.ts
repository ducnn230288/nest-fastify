import { setSeederFactory } from 'typeorm-extension';
import { Province } from '@model';

export default setSeederFactory(Province, (faker) => {
  const data = new Province();
  // data.code = faker.string.numeric(2);
  data.code = '10';
  data.name = faker.location.city();

  return data;
});
