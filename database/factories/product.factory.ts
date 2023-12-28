import { setSeederFactory } from 'typeorm-extension';
import { Product } from '@model';

export default setSeederFactory(Product, (faker) => {
    const data = new Product();
    data.name = faker.commerce.productName();
    data.description = faker.lorem.paragraph();
    data.quantity = faker.number.int({ min: 0, max: 1000 });
    data.price = faker.number.int({ min: 0, max: 1000000 });
    data.images = faker.image.url();
    data.slug = faker.lorem.slug();
    data.mass = faker.number.float({ min: 0, max: 100, precision: 0.1 });
    data.discountPrice = faker.number.float({ min: 0, max: 99, precision: 0.1  });
    data.categoryId = faker.string.uuid();
    data.storeId = faker.string.uuid();

    return data;
});
