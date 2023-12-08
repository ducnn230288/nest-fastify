import { Injectable } from "@nestjs/common";
import { BaseService } from "@shared";
import { SubOrganization } from "@model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class SubOrganizationService extends BaseService<SubOrganization> {
    constructor(
        @InjectRepository(SubOrganization)
        public repo: Repository<SubOrganization>,
    ) {
        super(repo);
    }

}