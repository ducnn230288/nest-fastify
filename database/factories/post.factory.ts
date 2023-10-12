import { setSeederFactory } from 'typeorm-extension';
import { Post } from '@model';

export default setSeederFactory(Post, (faker) => {
  const data = new Post();

  data.type = faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] });
  data.thumbnailUrl = faker.image.url();

  return data;
});
