import { setSeederFactory } from 'typeorm-extension';
import { Order } from '@model';

export default setSeederFactory(Order, (faker) => {
  const data = new Order();

  data.orderCode = faker.string.alpha({ length: 3, casing: 'upper', exclude: ['A'] });
  data.reason = faker.lorem.paragraph();

  return data;
});
