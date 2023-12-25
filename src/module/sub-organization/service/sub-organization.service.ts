import { ConflictException, ForbiddenException, Inject, Injectable, InternalServerErrorException, forwardRef } from "@nestjs/common";
import { BaseService } from "@shared";
import { SubOrganization, User } from "@model";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateSubOrganizationRequestDto } from "../dto";
import { isNullOrUndefined } from "util";
import { SUPPLIER_TYPE, SubOrgType } from "@enum";
import { AddressService, UserService } from "@service";
import { CreateUserRequestDto, UserDto } from "@dto";
import { SubOrganizationRepository } from "../repository/sub-organization.repository";
export const P_SUB_ORGANIZATION_CREATE = 'e1d01bee-a848-4924-9fdd-2f855bbda36a'

@Injectable()
export class SubOrganizationService extends BaseService<SubOrganization> {
    constructor(
        
        public repo: SubOrganizationRepository,
        public userService : UserService,    
        public addressService: AddressService,
        public dataSource: DataSource
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
        let data;
       const checkFax =await this.repo.checkFax(user,body)
        if (checkFax) {
            throw new ConflictException(
                'Số Fax đã được đăng kí trước đó.'
            );
        }
        await this.dataSource.transaction(async (transactionalEntityManager) => {
            const newAddress =  await this.addressService.create({ ...address, userId: user.id });
             data = await this.create({
                name: body.name,
                isActive: true,
                addressId: newAddress?.id,
                note,
                type,
                orgId: user.orgId,
                supplierType: supplierType,
                fax
            })
            
            const userDto = new CreateUserRequestDto()
            userDto.addressId = newAddress?.id!
            userDto.email=emailContact;
            userDto.name=nameContact;
            userDto.phoneNumber=phoneNumber;
            userDto.note=note;
            userDto.subOrgId=user.subOrgId
            await this.userService.create(userDto)
        })
 
       return data
        
    }
//     async getDetailSubOrganization(user: User,id :string){
//         const query = this.repo.createQueryBuilder('sub_org')
//         .select('sub_org')
//         .where()
//     }
}