import { setSeederFactory } from 'typeorm-extension';
import { UserRole } from '@model';

export default setSeederFactory(UserRole, (faker) => {
  const data = new UserRole();
  data.name = faker.person.jobType();
  data.code = faker.string.alpha();
  data.isSystemAdmin = true;

  return data;
});
