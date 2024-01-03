import { RetailPrice } from 'src/module/retail-price/model/retail-price.model';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(RetailPrice, (faker) => {
  const data = new RetailPrice();
  data.unit = faker.person.jobType();
  data.coefficient = faker.number.int();
  data.price = faker.number.int();
  data.barcode = faker.person.jobType();
  data.code = faker.person.firstName();
  data.basePrice = faker.number.int();
  return data;
});
