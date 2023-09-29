// import { Seeder } from 'typeorm-extension';
// import { DataSource } from 'typeorm';

// import { Address } from '@model';

// export class ParameterSeeder implements Seeder {
//   async run(dataSource: DataSource): Promise<void> {
//     const repository = dataSource.getRepository(Address);
//     const listData: Address[] = [
      
//     ];

//     for (const data of listData) {
//       const dataExists = await repository
//         .createQueryBuilder('base')
//         .andWhere(`base.code=:code`, { code: data.code })
//         .getOne();

//       if (!dataExists) {
//         const newData = repository.create(data);
//         await repository.save(newData);
//       }
//     }
//   }
// }
