import { QuestionTest } from '@model';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(QuestionTest, (faker) => {
  const data = new QuestionTest();
  data.point = faker.number.int({ min: 1, max: 20 });
  data.answer = {};
  return data;
});
