import { setSeederFactory } from 'typeorm-extension';
import { ProductStore } from '@model';

export default setSeederFactory(ProductStore, (faker) => {
  const data = new ProductStore();
  data.name = faker.person.fullName();
  data.phone = faker.phone.number();
  data.description = faker.lorem.paragraph();
  data.slug = faker.lorem.slug();
  data.avatar = faker.image.url();
  data.status = 0;
  return data;
});
