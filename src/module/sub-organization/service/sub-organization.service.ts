import { ForbiddenException, Inject, Injectable, InternalServerErrorException, forwardRef } from "@nestjs/common";
import { BaseService } from "@shared";
import { SubOrganization, User } from "@model";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateSubOrganizationRequestDto } from "../dto";
import { isNullOrUndefined } from "util";
import { SUPPLIER_TYPE, SubOrgType } from "@enum";
import { AddressService } from "@service";
export const P_SUB_ORGANIZATION_CREATE='e1d01bee-a848-4924-9fdd-2f855bbda36a'

@Injectable()
export class SubOrganizationService extends BaseService<SubOrganization> {
    constructor(
        @InjectRepository(SubOrganization)
        public repo: Repository<SubOrganization>,
     
         public addressService: AddressService,
        public dataSource : DataSource
    ) {
        super(repo);
    }


    async createSubOrg(body: CreateSubOrganizationRequestDto, user: User) {
        if (!user || user && user.roleCode !== 'supper_admin') {
            throw new ForbiddenException('Bạn không đủ quyền để tạo')
        }
        const {
            type,
            supplierType,
            fax,
            emailContact,
            phoneNumber,
            address,
            nameContact,
            note,
            connectKiot
        } = body;

    }
    async createSubOrgTest(body: CreateSubOrganizationRequestDto, user: User) {

        const {

            type,
            supplierType,
            fax,
            emailContact,
            phoneNumber,
            address,
            nameContact,
            note,
            connectKiot
        } = body;
        // const objectMessage =
        // type == SubOrgType.STORE
        //     ? SUB_ORG_TEXT.STORE
        //     : SUB_ORG_TEXT.SUPPLIER;

        const queryCheck = await this.repo.createQueryBuilder('subOrg')
            .where('subOrg.isDeleted IS NULL')
            .andWhere(`subOrg.orgId = ${user.orgId}`);
        if (
            !isNullOrUndefined(user.subOrgId) &&
            supplierType == SUPPLIER_TYPE.NON_BALANCE

        ) {
            queryCheck.andWhere(`subOrg.storeId = ${user.subOrgId}`);
        }
        const checkFax = await queryCheck
            .andWhere('subOrg.fax = :fax', { fax })
            .andWhere('subOrg.type = :type', { type })
            .getOne();
        if (checkFax) {
            throw new InternalServerErrorException(
                'Số Fax đã được đăng kí trước đó.'
            );
        }
                    const newAddress = await this.addressService.create({...address,userId:user.id});
                 return   await this.create({
                        name: body.name,
                        isActive: true,
                        addressId: newAddress?.id,
                        note,
                        type,
                        orgId: user.orgId,
                        supplierType: supplierType,
                        createdOn: new Date(),
                        updatedAt: new Date(),
                        fax
                    })
                
                
           
           
      
    }

}