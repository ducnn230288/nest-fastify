import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubOrganization } from "@model";
import { SubOrganizationController } from "@controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            SubOrganization
        ]),
    ],
    controllers: [
        SubOrganizationController
    ],
    providers: [],
    exports: [],
})

export class MemberModule { }