import { setSeederFactory } from 'typeorm-extension';
import { User } from '@model';
import {Example} from "@shared";

export default setSeederFactory(User, (faker) => {
  const data = new User();
  data.avatar = faker.image.url();
  data.name = faker.person.fullName();
  data.password = Example.password;
  data.email = faker.internet.email().toLowerCase();
  data.phoneNumber = faker.finance.accountNumber(12);
  data.dob = faker.date.birthdate();
  data.description = faker.lorem.paragraph();
  data.startDate = faker.date.past();
  data.dateLeave = faker.number.int({ min: 0.5, max: 12 });
  return data;
});
