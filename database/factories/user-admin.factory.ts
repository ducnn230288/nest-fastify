import { setSeederFactory } from 'typeorm-extension';
import { UserAdmin } from '@model';

export default setSeederFactory(UserAdmin, (faker) => {
  const data = new UserAdmin();
  data.username = faker.person.fullName();
  data.email = faker.internet.email();
  data.phoneNumber = faker.finance.accountNumber(12);
  data.note = faker.lorem.paragraph();

  return data;
});
