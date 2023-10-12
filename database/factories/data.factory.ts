import { setSeederFactory } from 'typeorm-extension';
import { Data } from '@model';

export default setSeederFactory(Data, (faker) => {
  const data = new Data();

  data.name = faker.person.jobType();
  data.type = faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] });
  data.image = faker.image.url();

  return data;
});
