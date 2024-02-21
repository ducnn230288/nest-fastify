import { setSeederFactory } from 'typeorm-extension';
import { AddressDistrict } from '@model';

export default setSeederFactory(AddressDistrict, (faker) => {
  const data = new AddressDistrict();
  data.code = faker.string.numeric(3);
  // data.code = '001';

  data.name = faker.location.city();

  return data;
});
