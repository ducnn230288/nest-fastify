import { setSeederFactory } from 'typeorm-extension';
import { ConnectKiotViet } from '@model';

export default setSeederFactory(ConnectKiotViet, (faker) => {
  const data = new ConnectKiotViet();
  data.clientSecret = faker.datatype.uuid()
  data.clientId = faker.datatype.uuid()
  data.retailer = faker.datatype.uuid()
  data.branchId = faker.datatype.number()
  return data;
});