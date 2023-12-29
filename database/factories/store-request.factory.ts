import { StoreRequest } from "@model";
import { setSeederFactory } from "typeorm-extension";

export default setSeederFactory(StoreRequest, (faker) => {
    const data = new StoreRequest();
    data.productName = faker.lorem.text();
    data.description = faker.lorem.text();
    data.note = faker.lorem.text();
    data.reason = faker.lorem.text();
    return data;
    
})