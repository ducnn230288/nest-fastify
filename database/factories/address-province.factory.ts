import { setSeederFactory } from 'typeorm-extension';
import { AddressProvince } from '@model';

export default setSeederFactory(AddressProvince, (faker) => {
  const data = new AddressProvince();
  // data.code = faker.string.numeric(2);
  data.code = '10';
  data.name = faker.location.city();

  return data;
});
