import { setSeederFactory } from 'typeorm-extension';
import { Data } from '@model';

export default setSeederFactory(Data, (faker) => {
  const data = new Data();

  data.name = faker.person.jobType();
  data.type = faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] });
  data.image = faker.image.url();
  data.translations = [
    {
      language: 'vn',
      name: faker.lorem.sentence(4),
      description: faker.lorem.paragraph(),
    },
    {
      language: 'en',
      name: faker.lorem.sentence(4),
      description: faker.lorem.paragraph(),
    },
  ];
  data.order = 1;

  return data;
});
