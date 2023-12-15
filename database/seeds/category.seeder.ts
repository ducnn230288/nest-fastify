import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class CategorySeeder implements Seeder {
    track?: boolean | undefined;
    run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        throw new Error("Method not implemented.");
    }
}