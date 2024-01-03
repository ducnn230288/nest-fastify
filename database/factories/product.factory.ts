import { Product } from "@model";
import { setSeederFactory } from "typeorm-extension";


export default setSeederFactory(Product, (faker) => {
    const data = new Product();
    data.name = faker.lorem.sentence(4);
    data.code = faker.string.uuid();
    data.price = faker.number.int({ min: 1000000, max: 10000000 });
    data.description = faker.lorem.paragraph();
    data.barcode = faker.string.uuid();
    data.brand = faker.lorem.sentence(4);
    data.origin = faker.lorem.sentence(4);
    data.abilitySupply = faker.lorem.sentence(4);
    
    return data;
})