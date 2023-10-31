import { setSeederFactory } from 'typeorm-extension';
import { Address } from '@model';

export default setSeederFactory(Address, (faker) => {
  const data = new Address();
  data.specificAddress = faker.lorem.paragraph();
  //   data.codeProvince = '10';
  //   data.codeDistrict = '001';
  //   data.codeWard = '00001';
  return data;
});
