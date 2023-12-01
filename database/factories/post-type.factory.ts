import { setSeederFactory } from 'typeorm-extension';
import { PostType } from '@model';

export default setSeederFactory(PostType, (faker) => {
  const data = new PostType();

  data.name = faker.person.jobType();
  data.code = faker.finance.bic();
  data.isPrimary = false;

  return data;
});
