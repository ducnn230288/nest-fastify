import { setSeederFactory } from 'typeorm-extension';
import { User } from '@model';

export default setSeederFactory(User, (faker) => {
  const data = new User();
  data.email = faker.internet.email().toLowerCase();
  data.dob = faker.date.birthdate();
  data.startDate = faker.date.past();
  data.description = faker.lorem.paragraph();
  data.avatar = faker.image.url();
  data.dateLeave = faker.number.int({ min: 0.5, max: 12 });

  return data;
});

// data.phoneNumber = faker.phone.number();
// data.positionCode = 'DEV';
// data.name = faker.person.fullName();
// data.dateOff = faker.number.int({ min: 0.5, max: 12 });
