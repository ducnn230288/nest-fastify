import { setSeederFactory } from 'typeorm-extension';
import { DayOff } from '@model';

export default setSeederFactory(DayOff, (faker) => {
  const data = new DayOff();
  data.code = '230715000001';
  data.type = faker.number.int({ min: 1, max: 3 });
  // data.status = faker.number.int({ min: -1, max: 1 });
  data.reason = faker.lorem.paragraph();
  data.time = faker.number.int({ min: 0, max: 2 });
  // data.timeNumber = faker.number.int({ min: 0.5, max: 1 });
  // data.timeNumber = 1;
  data.image = faker.image.url();
  data.dateLeaveStart = faker.date.soon({ days: 1 });
  data.dateLeaveEnd = faker.date.soon({ days: 10 });
  // data.approvedAt = faker.date.soon({ days: 10 });
  //   data.approvedById
  // data.reasonReject = faker.lorem.paragraph();
  // staffId
  // data.managerId

  return data;
});
