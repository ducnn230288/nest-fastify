import { setSeederFactory } from 'typeorm-extension';
import { User } from '@model';

export default setSeederFactory(User, (faker) => {
  const data = new User();
  data.avatar = faker.image.url();
  data.name = faker.person.fullName();
  data.password = 'Password1!';
  data.email = faker.internet.email().toLowerCase();
  data.phoneNumber = faker.phone.number('0#########');
  data.dob = faker.date.birthdate();
  data.description = faker.lorem.paragraph();
  data.startDate = faker.date.past();
  data.dateLeave = faker.number.int({ min: 0.5, max: 12 });
  return data;
});
