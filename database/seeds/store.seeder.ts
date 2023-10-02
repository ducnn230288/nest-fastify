import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';
import { Store } from '@model';

export class StoreSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Store);
    const listData: Store[] = [
      {
        name: 'TaiStore',
        status: 'Dev',
        phone: faker.phone.number().toString(),
        slug: 'tais',
        avatar: 'https://hinhanhdep.org/wp-content/uploads/2016/07/anh-avatar-girl-xinh.jpg',
        description: faker.lorem.paragraph(),
        userId: `b88bf76c-4aab-49bb-929b-a6d24549a225`,
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
