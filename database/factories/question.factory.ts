import { Question } from '@model';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Question, (faker) => {
  const data = new Question();
  data.question = faker.lorem.paragraph();
  data.options = 'A,B,C,D';
  data.correct = 'D';
  data.image = faker.image.url();
  data.level = faker.number.int({ min: 1, max: 12 });
  return data;
});
