import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectKiotViet, SubOrganization } from "@model";
import { SubOrganizationController } from "@controller";
import { SubOrganizationService } from "@service";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            SubOrganization,
            ConnectKiotViet
        ]),
    ],
    controllers: [
        SubOrganizationController
    ],
    providers: [
        SubOrganizationService
    ],
    exports: [],
})

export class SubOrganizationModule { }