import { setSeederFactory } from 'typeorm-extension';
import { AddressWard } from '@model';

export default setSeederFactory(AddressWard, (faker) => {
  const data = new AddressWard();
  // data.code = faker.string.numeric(5);
  data.code = '00001';

  data.name = faker.location.city();

  return data;
});
