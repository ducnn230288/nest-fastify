import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { Building, Room } from '@model';
import { Brackets, DataSource } from 'typeorm';
import { isNullOrUndefined } from 'util';
import { RoomRepository } from './room.repository';

@Injectable()
export class BuildingRepository extends BaseRepository<Building> {
  constructor(
    public readonly dataSource: DataSource,
    public readonly roomRepository: RoomRepository,
  ) {
    super(Building, dataSource.createEntityManager());
  }

  /**
   *
   * @returns Building
   *
   */
  async getBuildings() {
    const page = 1;
    const perPage = 10;
    let fullTextSearch = '';
    const sort = '';
    const filter = '{}';

    const query = this.createQueryBuilder('building')
      .innerJoin('building.rooms', 'rooms', 'rooms.isPublic = TRUE')
      .leftJoin('building.buildingAddress', 'buildingAddress')
      .leftJoin('building.buildingContent', 'buildingContent')
      .select(['building', 'buildingContent', 'buildingAddress.district'])
      .groupBy('buildingAddress.district')
      .addGroupBy('building.id')
      .addGroupBy('buildingContent.id')
      .andWhere('building.isDeleted = FALSE')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (!isNullOrUndefined(fullTextSearch) && fullTextSearch.trim() != '') {
      fullTextSearch = fullTextSearch
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      fullTextSearch = fullTextSearch.replace('đ', 'd');
      fullTextSearch = fullTextSearch.replace('Đ', 'D');
      console.log('fullTextSearch', fullTextSearch);
      query.andWhere(
        new Brackets((sqb) => {
          sqb.orWhere('LOWER(unaccent(building.name)) LIKE LOWER(:name)', {
            name: `%${fullTextSearch}%`,
          });
          sqb.orWhere('LOWER(unaccent(building.address)) LIKE LOWER(:address)', {
            address: `%${fullTextSearch}%`,
          });
        }),
      );
    }

    if (typeof sort != 'undefined') {
      const { name, manager, address, type, description } = JSON.parse(sort);
      if (!isNullOrUndefined(name)) {
        query.addOrderBy('building.name', name);
      }
      if (!isNullOrUndefined(address)) {
        query.addOrderBy('building.address', address);
      }
      if (!isNullOrUndefined(type)) {
        // console.log(roomNumber);
        query.addOrderBy('building.type', type);
      }
      if (!isNullOrUndefined(description)) {
        query.addOrderBy('building.description', description);
      }
    }
    if (typeof filter != 'undefined') {
      const { type, province, district, ward } = JSON.parse(filter);
      if (type) {
        query.andWhere('building.type = :type', {
          type: `${type}`,
        });
      }
      if (province) {
        query.andWhere('LOWER(buildingAddress.province) LIKE LOWER(:province)', {
          province: `%${province}%`,
        });
      }
      if (district) {
        query.andWhere('LOWER(buildingAddress.district) = LOWER(:district)', {
          district: district,
        });
      }
      if (ward) {
        query.andWhere('LOWER(buildingAddress.ward) LIKE LOWER(:ward)', {
          ward: `%${ward}%`,
        });
      }
    }

    const data = await query.getMany();
    const total = await query.getCount();
    await Promise.all(
      data.map(async (e) => {
        e.media = `${process.env.HOST_BACK_END}/api/v1/util/download?key=${e.media}`;
        const numPublicRoom = await this.roomRepository.getCountByBuilding(e.id);
        e['numPublicRoom'] = numPublicRoom;
      }),
    );

    return {
      statusCode: 200,
      message: 'Get data Successful!',
      data,
      total,
    };
  }
}
