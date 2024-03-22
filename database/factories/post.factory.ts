import { setSeederFactory } from 'typeorm-extension';
import { Post } from '@model';

export default setSeederFactory(Post, (faker) => {
  const data = new Post();

  data.type = faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] });
  data.thumbnailUrl = faker.image.url();
  data.translations = [
    {
      type: 'text',
      language: 'vn',
      name: faker.lorem.sentence(4),
      description: faker.lorem.paragraph(),
      slug: faker.lorem.slug(),
    },
    {
      type: 'text',
      language: 'en',
      name: faker.lorem.sentence(4),
      description: faker.lorem.paragraph(),
      slug: faker.lorem.slug(),
    },
  ];

  return data;
});
