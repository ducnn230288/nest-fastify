import { setSeederFactory } from 'typeorm-extension';
import { Data } from '@model';

export default setSeederFactory(Data, (faker) => {
  const data = new Data();

  data.name = faker.person.jobType();
  data.type = faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] });
  data.image = faker.image.url();
  data.icon = faker.image.url();
  data.startTime = faker.date.past({years: 5, refDate: '2023-01-01T00:00:00.000Z'});
  data.startTime = faker.date.past({years: 1});

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
