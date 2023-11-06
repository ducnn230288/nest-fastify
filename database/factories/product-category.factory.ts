import { setSeederFactory } from 'typeorm-extension';
import { ProductCategory } from '@model';

export default setSeederFactory(ProductCategory, (faker) => {
  const data = new ProductCategory();
  data.description = faker.lorem.paragraph();
  data.name = faker.person.fullName();
  data.slug = faker.lorem.slug();
  data.image = faker.image.url();
  return data;
});
