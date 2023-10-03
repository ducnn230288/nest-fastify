import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';
import { Store } from '@model';

export class StoreSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Store);
    const listData: Store[] = [
      {
        name: faker.person.fullName(),
        status: 0,
        phone: faker.phone.number().toString(),
        slug: faker.lorem.slug(),
        avatar: faker.image.url(),
        description: faker.lorem.paragraph(),
        userId: `15770167-33b8-432d-89a0-187a871ced25`,
      },
    ];

    for (const data of listData) {
      const dataExists = await repository
        .createQueryBuilder('base')
        .andWhere(`base.name=:name`, { name: data.name })
        .getOne();

      if (!dataExists) {
        let newData = repository.create(data);
        newData = await repository.save(newData);
      }
    }
  }
}
