import { setSeederFactory } from 'typeorm-extension';
import { Booking } from '@model';

export default setSeederFactory(Booking, (faker) => {
  const data = new Booking();
  data.name = faker.person.jobType();
  data.description = faker.lorem.paragraph();
  data.startTime = faker.date.soon();
  data.endTime = faker.date.soon();

  return data;
});
