import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectKiotViet, SubOrganization } from "@model";
import { SubOrganizationController } from "@controller";
import { AddressService, SubOrganizationService } from "@service";
import { AddressRepository } from "../user/repository/address.repository";
import { UserModule } from "../user/user.module";
import { SubOrganizationRepository } from "@repository";



@Module({
    imports: [
        TypeOrmModule.forFeature([
            SubOrganization,
            ConnectKiotViet,

        ]),
        UserModule,

    ],
    controllers: [
        SubOrganizationController
    ],
    providers: [
        SubOrganizationService,
        SubOrganizationRepository
    ],
    exports: [SubOrganizationRepository],
})

export class SubOrganizationModule { }