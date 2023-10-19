import { Product } from '@model';
import { setSeederFactory } from 'typeorm-extension';
export default setSeederFactory(Product, (faker) => {
  const product = new Product();
  product.name = faker.person.fullName();
  product.description = faker.lorem.paragraph();
  product.quantity = faker.number.int({ min: 50, max: 100 });
  product.price = faker.number.int({ min: 0, max: 100000000 });
  product.images = [faker.image.url(), faker.image.url()];
  product.slug = faker.lorem.slug();
  product.mass = faker.number.int({ min: 0, max: 100 });
  product.productCategoryId = faker.string.uuid() || '';
  product.productStoreId = faker.string.uuid() || '';
  return product;
});
