import { ConflictException, ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException, forwardRef } from "@nestjs/common";
import { BaseService } from "@shared";
import { SubOrganization, User } from "@model";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateSubOrganizationRequestDto, UpdateSubOrganizationActiveDto, UpdateSubOrganizationDto } from "@dto";
import { isNullOrUndefined } from "util";
import { SUPPLIER_TYPE, SubOrgType } from "@enum";
import { AddressService, UserService } from "@service";
import { CreateUserRequestDto, UserDto } from "@dto";
import { SubOrganizationRepository } from "../repository/sub-organization.repository";
import { async } from "rxjs";
import { I18n, I18nContext } from "nestjs-i18n";
export const P_SUB_ORGANIZATION_CREATE = 'e1d01bee-a848-4924-9fdd-2f855bbda36a';
export const P_SUB_ORGANIZATION_UPDATE = 'e2ba1491-ddfd-4acc-90cd-7df987700b52';
export const P_SUB_ORGANIZATION_UPDATE_ACTIVE_STATUS = '0e399cb2-00b5-4d93-897f-85321715aeb8';
export const P_SUB_ORGANIZATION_DELETE = '0bbc127d-043b-4987-931f-e9349c63c00f';

@Injectable()
export class SubOrganizationService extends BaseService<SubOrganization> {
    constructor(

        public repo: SubOrganizationRepository,
        public userService: UserService,
        public addressService: AddressService,
        public dataSource: DataSource
    ) {
        super(repo);
    }


    // async createSubOrg(body: CreateSubOrganizationRequestDto, user: User) {
    //     // if (!user || user && user.roleCode !== 'supper_admin') {
    //     //     throw new ForbiddenException('Bạn không đủ quyền để tạo');
    //     // }
    //     const {
    //         type,
    //         supplierType,
    //         fax,
    //         emailContact,
    //         phoneNumber,
    //         address,
    //         nameContact,
    //         note,
    //         connectKiot
    //     } = body;

    // }
    async add(body: CreateSubOrganizationRequestDto, user: User): Promise<any> {
        const {
            note,
            emailContact,
            phoneNumber,
            address,
            nameContact,
            connectKiot,
            storeId,
            ...subOrg
        } = body;
        let data;
        if (await this.repo.checkFax(user, body)) {
            throw new ConflictException('Số Fax đã được đăng kí trước đó.');
        }
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            const newAddress = await this.addressService.create({ ...address, userId: user.id })
            data = await this.create({
                addressId: newAddress?.id,
                orgId: user.orgId!,
                note,
                storeId:user.subOrgId||storeId!,
                ...subOrg
            });
            await this.userService.create({
                addressId: newAddress?.id!,
                name: nameContact,
                note,
                orgId: user.orgId,
                phoneNumber,
                email: emailContact,
                subOrgId: user.subOrgId,
            });
        });
        return data
    }
    async updateSubOrganization(
        subOrgDto: UpdateSubOrganizationDto,
        id: string,
        user: User
    ) {
        const i18n = I18nContext.current();
        const {
            emailContact,
            phoneNumber,
            address,
            nameContact,
            connectKiot,
            storeId,
            ...sub
        } = subOrgDto;
        //check sub-org exist
        const subOrg = await this.findOne(id);
        if (isNullOrUndefined(subOrg)) {
            throw new NotFoundException(i18n?.t('common.Data id not found', { args: { id } }));
        }
        const checkFax = await this.repo.checkFax(user, subOrgDto);
        //check fax exist
        if (!isNullOrUndefined(checkFax)) {
            throw new ConflictException('fax đã được sử dụng');
        }
        // update sub-org , address , user
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            await this.update(id,sub);
            await this.addressService.update(subOrg.addressId, address!);
            const addressSubOrg = await this.addressService.findOne(subOrg.addressId);
            await this.userService.update(
                addressSubOrg?.userId!,
                {
                    name: nameContact!,
                    email: emailContact!,
                    phoneNumber: phoneNumber!,
                }
            )
        });
    }
    //     async updateActiveStatusSubOrganization(
    //         user: User,
    //         updateActiveStatusDto: UpdateSubOrganizationActiveDto,
    //         id: string
    //     ) {
    //         const { isActive } = updateActiveStatusDto
    //             const data= await this.update(id,updateActiveStatusDto)
    //             return data;
    //     }
}