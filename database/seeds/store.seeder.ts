// import { Seeder } from 'typeorm-extension';
// import { DataSource } from 'typeorm';

// import { Store } from '@model';

// export class CodeSeeder implements Seeder {
//   async run(dataSource: DataSource): Promise<void> {
//     const repository = dataSource.getRepository(Store);
//     const listData: Store[] = [
//       { name: 'tai', status: 'Dev', phone: 01235456, slug: 'tais', avatar: 'https://hinhanhdep.org/wp-content/uploads/2016/07/anh-avatar-girl-xinh.jpg' },
//     ];

//     for (const data of listData) {
//       const dataExists = await repository
//         .createQueryBuilder('base')
//         .andWhere(`base.code=:code`, { code: data.code })
//         .getOne();

//       if (!dataExists) {
//         let newData = repository.create(data);
//         newData = await repository.save(newData);
//       }
//     }
//   }
// }
