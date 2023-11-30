import { setSeederFactory } from 'typeorm-extension';
import { DayOff } from '@model';

export default setSeederFactory(DayOff, (faker) => {
  const data = new DayOff();
  data.code = faker.string.numeric(12);
  data.type = faker.number.int({ min: 1, max: 3 });
  data.reason = faker.lorem.paragraph();
  data.time = faker.number.int({ min: 0, max: 2 });
  data.image = faker.image.url();
  data.dateLeaveStart = faker.date.soon({ days: 1 });
  data.dateLeaveEnd = faker.date.soon({ days: 10 });
  return data;
});
