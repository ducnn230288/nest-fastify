import { setSeederFactory } from 'typeorm-extension';
import { Parameter } from '@model';

export default setSeederFactory(Parameter, (faker) => {
  const data = new Parameter();

  data.code = faker.finance.bic();
  data.description = faker.lorem.paragraph();
  data.vn = faker.lorem.paragraph();
  data.en = faker.lorem.paragraph();

  return data;
});
