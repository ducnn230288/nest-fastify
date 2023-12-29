import { StoreRequestController } from '@controller';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreRequest } from "@model";
import { StoreRequestService } from '@service';
import { StoreRequestRepository } from '@repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            StoreRequest
        ]),
    ],
    controllers: [
        StoreRequestController
    ],
    providers: [
        StoreRequestService,
        StoreRequestRepository
    ],
    exports: [],
})

export class StoreRequestModule { }