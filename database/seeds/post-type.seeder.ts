import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { PostType } from '@model';

export class PostTypeSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(PostType);
    const listData: PostType[] = [
      { name: 'News', code: 'news', isPrimary: true },
      // { name: 'News', code: 'news', isPrimary: true, children: [{ name: 'News 1', code: 'news1', isPrimary: false }] },
      { name: 'Projects', code: 'projects', isPrimary: true },
    ];

    // const newData = repository.create({ name: 'News', code: 'news', isPrimary: true });
    // const newData1 = await repository.save(newData);
    // const newData2 = repository.create({ name: 'Projects', code: 'projects', isPrimary: true });
    // newData2.parent = newData1;
    // await repository.save(newData2);
    for (const { children, ...data } of listData) {
      const dataExists = await repository
        .createQueryBuilder('base')
        .andWhere(`base.code=:code`, { code: data.code })
        .getOne();

      if (!dataExists) {
        const newData = repository.create(data);
        const parent = await repository.save(newData);

        if (children?.length) {
          for (const item of children) {
            const dataExists = await repository
              .createQueryBuilder('base')
              .andWhere(`base.code=:code`, { code: item.code })
              .getOne();

            if (!dataExists) {
              const newData = repository.create(item);
              newData.parent = parent;
              await repository.save(newData);
            }
          }
        }
      }
    }
  }
}
