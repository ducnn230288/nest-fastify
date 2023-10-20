import { OrderProduct } from '@model';
import { setSeederFactory } from 'typeorm-extension';
export default setSeederFactory(OrderProduct, (faker) => {
  const data = new OrderProduct();
  data.name = faker.person.fullName();
  data.quantity = faker.number.int({ min: 50, max: 100 });
  data.price = faker.number.int({ min: 0, max: 100000000 });
  data.discount = faker.number.int({ min: 0, max: 90 });

  return data;
});
