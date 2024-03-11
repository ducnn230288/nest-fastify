import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import dayjs from 'dayjs';

import { User, UserRole } from '@model';

import {
  P_AUTH_DELETE_IMAGE_TEMP,
  P_CODE_CREATE,
  P_CODE_DELETE,
  P_CODE_DETAIL,
  P_CODE_LISTED,
  P_CODE_UPDATE,
  P_CODE_TYPE_CREATE,
  P_CODE_TYPE_DELETE,
  P_CODE_TYPE_DETAIL,
  P_CODE_TYPE_LISTED,
  P_CODE_TYPE_UPDATE,
  P_DATA_CREATE,
  P_DATA_DELETE,
  P_DATA_LISTED,
  P_DATA_UPDATE,
  P_DATA_TYPE_CREATE,
  P_DATA_TYPE_DELETE,
  P_DATA_TYPE_LISTED,
  P_DATA_TYPE_UPDATE,
  P_PARAMETER_CREATE,
  P_PARAMETER_DELETE,
  P_PARAMETER_LISTED,
  P_PARAMETER_UPDATE,
  P_POST_CREATE,
  P_POST_DELETE,
  P_POST_LISTED,
  P_POST_UPDATE,
  P_POST_TYPE_CREATE,
  P_POST_TYPE_DELETE,
  P_POST_TYPE_LISTED,
  P_POST_TYPE_UPDATE,
  P_USER_CREATE,
  P_USER_DELETE,
  P_USER_DETAIL,
  P_USER_LISTED,
  P_USER_UPDATE,
  P_USER_ROLE_CREATE,
  P_USER_ROLE_DELETE,
  P_USER_ROLE_DETAIL,
  P_USER_ROLE_LISTED,
  P_USER_ROLE_UPDATE,
  // P_ADDRESS_LISTED,
  P_ADDRESS_CREATE,
  P_ADDRESS_UPDATE,
  // P_ADDRESS_DETAIL,
  P_ADDRESS_DELETE,
  PRODUCT_CREATE,
  PRODUCT_LIST,
  PRODUCT_DETAIL,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
  CATEGORY_CREATE,
  CATEGORY_UPDATE,
  CATEGORY_DETAIL,
  CATEGORY_LIST,
  CATEGORY_DELETE,
  STORE_LISTED,
  STORE_DETAIL,
  STORE_CREATE,
  STORE_UPDATE,
  STORE_DELETE,
  P_ORDER_LISTED,
  P_ORDER_CREATE,
} from '@service';

export class UserSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const dataRoleSuperAdmin: UserRole = {
      name: 'Super Admin',
      code: 'super_admin',
      permissions: [
        P_AUTH_DELETE_IMAGE_TEMP,

        P_CODE_TYPE_LISTED,
        P_CODE_TYPE_DETAIL,
        P_CODE_TYPE_CREATE,
        P_CODE_TYPE_UPDATE,
        P_CODE_TYPE_DELETE,

        P_CODE_LISTED,
        P_CODE_DETAIL,
        P_CODE_CREATE,
        P_CODE_UPDATE,
        P_CODE_DELETE,

        P_USER_ROLE_LISTED,
        P_USER_ROLE_DETAIL,
        P_USER_ROLE_CREATE,
        P_USER_ROLE_UPDATE,
        P_USER_ROLE_DELETE,

        P_USER_LISTED,
        P_USER_DETAIL,
        P_USER_CREATE,
        P_USER_DELETE,
        P_USER_UPDATE,

        P_DATA_TYPE_LISTED,
        P_DATA_TYPE_CREATE,
        P_DATA_TYPE_UPDATE,
        P_DATA_TYPE_DELETE,

        P_DATA_LISTED,
        P_DATA_CREATE,
        P_DATA_UPDATE,
        P_DATA_DELETE,

        P_PARAMETER_CREATE,
        P_PARAMETER_DELETE,
        P_PARAMETER_LISTED,
        P_PARAMETER_UPDATE,

        P_POST_CREATE,
        P_POST_DELETE,
        P_POST_LISTED,
        P_POST_UPDATE,

        P_POST_TYPE_CREATE,
        P_POST_TYPE_DELETE,
        P_POST_TYPE_LISTED,
        P_POST_TYPE_UPDATE,

        // P_ADDRESS_LISTED,
        // P_ADDRESS_DETAIL,
        P_ADDRESS_CREATE,
        P_ADDRESS_UPDATE,
        P_ADDRESS_DELETE,

        PRODUCT_CREATE,
        PRODUCT_LIST,
        PRODUCT_DETAIL,
        PRODUCT_UPDATE,
        PRODUCT_DELETE,

        CATEGORY_CREATE,
        CATEGORY_UPDATE,
        CATEGORY_DETAIL,
        CATEGORY_LIST,
        CATEGORY_DELETE,

        STORE_LISTED,
        STORE_DETAIL,
        STORE_CREATE,
        STORE_UPDATE,
        STORE_DELETE,

        P_ORDER_LISTED,
        P_ORDER_CREATE,
      ],
      isSystemAdmin: false,
    };
    const repoRole = dataSource.getRepository(UserRole);
    const roleSuperAdminExists = await repoRole
      .createQueryBuilder('base')
      .andWhere(`base.name=:name`, { name: dataRoleSuperAdmin.name })
      .getOne();

    if (!roleSuperAdminExists) {
      const newDataRoleSuperAdmin = repoRole.create(dataRoleSuperAdmin);
      await repoRole.save(newDataRoleSuperAdmin);

      const repository = dataSource.getRepository(User);
      const data: User = await factoryManager.get(User).make({
        email: 'admin@admin.com',
        avatar: 'https://hinhanhdep.org/wp-content/uploads/2016/07/anh-avatar-girl-xinh.jpg',
        roleCode: newDataRoleSuperAdmin.code,
      });
      if (
        dayjs().endOf('year').toDate().toDateString() === dayjs(data.startDate).endOf('year').toDate().toDateString()
      ) {
        data.dateLeave = dayjs().diff(dayjs(data.startDate), 'months');
      } else {
        data.dateLeave = dayjs().startOf('year').diff(dayjs(data.startDate), 'months');
      }
      const dataExists = await repository
        .createQueryBuilder('base')
        .andWhere(`base.email=:email`, { email: data.email })
        .getOne();

      if (!dataExists) {
        const newData = repository.create(data);
        await repository.save(newData);
      }
    }
  }
}
