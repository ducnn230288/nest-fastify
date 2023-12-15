import { Category } from "@model";
import { setSeederFactory } from "typeorm-extension";



export default setSeederFactory(Category, (faker) => {
    const data = new Category();

    data.name = faker.person.jobType();
    
    return data;

})