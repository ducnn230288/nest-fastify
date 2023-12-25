import { setSeederFactory } from 'typeorm-extension';
import { Category } from '@model';

export default setSeederFactory(Category, (faker) => {
  const data = new Category();
  data.name = faker.commerce.productName();
  data.isParent = false;
  
  return data;
});
