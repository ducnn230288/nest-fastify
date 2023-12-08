import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubOrganization } from "@model";
import { SubOrganizationController } from "@controller";
import { SubOrganizationService } from "@service";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            SubOrganization
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

export class MemberModule { }