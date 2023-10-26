import { setSeederFactory } from 'typeorm-extension';
import { UserTeam } from '@model';

export default setSeederFactory(UserTeam, (faker) => {
  const data = new UserTeam();
  data.description = faker.lorem.paragraph();
  data.name = faker.person.fullName();

  return data;
});
