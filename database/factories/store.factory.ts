import { setSeederFactory } from 'typeorm-extension';
import { Store } from '@model';

export default setSeederFactory(Store, (faker) => {
    const data = new Store();
    data.name = faker.company.name();
    data.phone = faker.phone.number();
    data.description = faker.lorem.paragraph();
    data.slug = faker.lorem.slug();
    data.avatar = faker.image.url();
    return data;
});
