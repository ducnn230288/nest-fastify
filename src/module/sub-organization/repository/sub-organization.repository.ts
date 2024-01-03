import { ConflictException, Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared';
import { SubOrganization } from '../model';
import { DataSource, Repository } from 'typeorm';
import { async, publish } from 'rxjs';
import { User } from '@model';
import { isNullOrUndefined } from 'util';
import { SUPPLIER_TYPE, SUBORG_TYPE } from '../enum';
import { CreateSubOrganizationRequestDto, UpdateSubOrganizationDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubOrganizationRepository extends BaseRepository<SubOrganization> {
  constructor(public readonly dataSource: DataSource) {
    super(SubOrganization, dataSource.createEntityManager());
  }

  async checkFax(user: User, body: CreateSubOrganizationRequestDto | UpdateSubOrganizationDto): Promise<any> {
    const queryCheck = await this.createQueryBuilder('subOrg')
      .where('subOrg.isDeleted IS NULL')
      .andWhere(`subOrg.orgId = ${user.orgId}`);
    if (!isNullOrUndefined(user.subOrgId) && body.supplierType == SUPPLIER_TYPE.NON_BALANCE) {
      queryCheck.andWhere(`subOrg.storeId = ${user.subOrgId}`);
    }
    return await queryCheck
      .andWhere('subOrg.fax = :fax', { fax: body.fax })
      .andWhere('subOrg.type = :type', { type: body.type })
      .getOne();
  }
  async getSuppliersByAdmin(user: User) {
    const data = await this.createQueryBuilder('sub_organization')
      .select(['sub_organization.id', 'sub_organization.name', 'sub_organization.supplierType'])
      //.where(`sub_organization.orgId = ${user.orgId}`)
      .where('sub_organization.type = :type', {
        type: SUBORG_TYPE.SUPPLIER,
      })
      .andWhere('sub_organization.supplierType = :supplierType', {
        supplierType: SUPPLIER_TYPE.BALANCE,
      })
      .getMany();
    return data;
  }
  async getAllSuppliersByDistributor(user : User){
    const data = await this.createQueryBuilder('sub_organization')
    .leftJoin('sub_organization.address', 'address')
    .select([
      'sub_organization','address'
    ])
    .andWhere('address.id = sub_organization.address_id')
                .andWhere('sub_organization.type = :type', {
                    type: SUBORG_TYPE.SUPPLIER
                })
  
  }
}
