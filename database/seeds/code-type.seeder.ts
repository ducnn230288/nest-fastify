import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { Code, CodeType } from '@model';

export class CodeTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const listData: CodeType[] = [
      {
        name: 'Position',
        code: 'position',
        isPrimary: true,
        items: [
          { name: 'President & CEO', code: 'PC', type: 'position' },
          { name: 'CCO', code: 'CCO', type: 'position' },
          { name: 'Vice Director', code: 'VD', type: 'position' },
          { name: 'Vice Director', code: 'VD', type: 'position' },
          { name: 'Delivery Manager', code: 'DM', type: 'position' },
          { name: 'CTO', code: 'CTO', type: 'position' },
          { name: 'Admin', code: 'AD', type: 'position' },
          { name: 'Accountant', code: 'ACC', type: 'position' },
          { name: 'Ai Technical Leader', code: 'ATL', type: 'position' },
          { name: 'Web-App Technical Leader', code: 'WATL', type: 'position' },
          { name: 'Project Technical Leader', code: 'PTL', type: 'position' },
          { name: 'Developer', code: 'DEV', type: 'position' },
          { name: 'Engineer', code: 'ENG', type: 'position' },
          { name: 'Business Analyst', code: 'BA', type: 'position' },
          { name: 'Tester', code: 'TESTER', type: 'position' },
        ],
      },
      { name: 'Room', code: 'room', isPrimary: true, items: [{ name: 'Room', code: 'ROOM', type: 'room' }] },
      {
        name: 'Project',
        code: 'project',
        isPrimary: true,
        items: [{ name: 'Project', code: 'PROJECT', type: 'project' }],
      },
      { name: 'Test', code: 'test', isPrimary: true, items: [{ name: 'Test', code: 'TEST', type: 'test' }] },
    ];

    for (const data of listData) {
      const repository = dataSource.getRepository(CodeType);
      const dataExists = await repository
        .createQueryBuilder('base')
        .andWhere(`base.code=:code`, { code: data.code })
        .getOne();

      if (!dataExists) {
        const newData = repository.create(data);
        await repository.save(newData);

        if (data.items?.length) {
          const repository = dataSource.getRepository(Code);
          for (const item of data.items) {
            const dataExists = await repository
              .createQueryBuilder('base')
              .andWhere(`base.code=:code`, { code: item.code })
              .getOne();

            if (!dataExists) {
              let newData = repository.create(item);
              newData = await repository.save(newData);
            }
          }
        }
      }
    }

    // if (appConfig.NODE_ENV !== 'prod') {
    //   const codeTypeFactory = factoryManager.get(CodeType);
    //   const datas = await codeTypeFactory.saveMany(1);
    //   for (const item of datas) {
    //     const codeFactory = factoryManager.get(Code);
    //     await codeFactory.saveMany(1, { type: item.code });
    //   }
    // }
  }
}
