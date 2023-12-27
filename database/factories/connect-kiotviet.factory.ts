import { setSeederFactory } from 'typeorm-extension';
import { ConnectKiotViet } from '@model';

export default setSeederFactory(ConnectKiotViet, (faker) => {
  const data = new ConnectKiotViet();
  data.clientSecret = faker.string.uuid()
  data.clientId = faker.string.uuid()
  data.retailer = faker.string.uuid()
  data.branchId = faker.number.int()
  return data;
});