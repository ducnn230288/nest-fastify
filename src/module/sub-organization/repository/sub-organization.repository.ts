import { ConflictException, Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared";
import { SubOrganization } from "../model";
import { DataSource, Repository } from "typeorm";
import { async, publish } from "rxjs";
import { User } from "@model";
import { isNullOrUndefined } from "util";
import { SUPPLIER_TYPE } from "../enum";
import { CreateSubOrganizationRequestDto, UpdateSubOrganizationDto } from "../dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SubOrganizationRepository extends BaseRepository<SubOrganization>{
    constructor(
        public readonly dataSource: DataSource,
        ) {
        super(SubOrganization, dataSource.createEntityManager());
      }
     
   async checkFax(user : User, body:CreateSubOrganizationRequestDto|UpdateSubOrganizationDto):Promise<any>{
    const queryCheck=  await this.createQueryBuilder('subOrg')
                .where('subOrg.isDeleted IS NULL')
                .andWhere(`subOrg.orgId = ${user.orgId}`);
                if (
                    !isNullOrUndefined(user.subOrgId) &&
                    body.supplierType == SUPPLIER_TYPE.NON_BALANCE
                ) {
                    queryCheck.andWhere(`subOrg.storeId = ${user.subOrgId}`);
                }        
                return  await queryCheck
                .andWhere('subOrg.fax = :fax', { fax:body.fax })
                .andWhere('subOrg.type = :type', { type :body.type})
                .getOne();        
   }

}
