import { ForbiddenException, Injectable } from "@nestjs/common";
import { BaseService } from "@shared";
import { SubOrganization, User } from "@model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSubOrganizationRequestDto } from "../dto";


@Injectable()
export class SubOrganizationService extends BaseService<SubOrganization> {
    constructor(
        @InjectRepository(SubOrganization)
        public repo: Repository<SubOrganization>,
    ) {
        super(repo);
    }


    async createSubOrg(body: CreateSubOrganizationRequestDto, user: User) {
        if(!user || user && user.roleCode  !== 'supper_admin') {
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

}