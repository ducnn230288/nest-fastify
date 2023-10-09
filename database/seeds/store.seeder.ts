import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker/locale/vi';
import { ProductStore, User } from '@model';
// import { UserDto } from '@dto';

export class StoreSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ProductStore);
    const repoUser = dataSource.getRepository(User);
    const user = await repoUser
      .createQueryBuilder('base')
      .andWhere(`base.email=:email`, { email: 'admin@admin.com' })
      .withDeleted()
      .getOne();
    console.log('user: ', user);
    const listData: ProductStore[] = [
      {
        name: faker.person.fullName(),
        status: 0,
        phone: faker.phone.number().toString(),
        slug: faker.lorem.slug(),
        avatar: faker.image.url(),
        description: faker.lorem.paragraph(),
        userId: user?.id,
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
