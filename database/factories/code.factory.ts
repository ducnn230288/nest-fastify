import { setSeederFactory } from 'typeorm-extension';
import { Code } from '@model';

export default setSeederFactory(Code, (faker) => {
  const data = new Code();
  data.name = faker.person.jobType();
  data.code = faker.finance.bic();
  data.type = faker.finance.bic();
  data.description = faker.lorem.paragraph();

  return data;
});
