import { setSeederFactory } from 'typeorm-extension';
import { CodeType } from '@model';

export default setSeederFactory(CodeType, (faker) => {
  const data = new CodeType();
  data.name = faker.person.jobType();
  data.code = faker.finance.bic();

  return data;
});
