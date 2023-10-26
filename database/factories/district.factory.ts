import { setSeederFactory } from 'typeorm-extension';
import { District } from '@model';

export default setSeederFactory(District, (faker) => {
  const data = new District();
  data.code = faker.string.numeric(3);
  // data.code = '001';

  data.name = faker.location.city();

  return data;
});
