import { setSeederFactory } from 'typeorm-extension';
import { DataType } from '@model';

export default setSeederFactory(DataType, (faker) => {
  const data = new DataType();

  data.name = faker.person.jobType();
  data.code = faker.finance.bic();

  return data;
});
