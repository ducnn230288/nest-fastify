import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { appConfig } from '@config';
import { StoreController } from '@controller';
import { Product, Store } from '@model';
import { ProductService, StoreService } from '@service';
import { ProductRepository, StoreRepository } from '@repository';
import { ProductController } from './controller/product.controller';

@Module({
    imports: [
        JwtModule.register({
            secret: appConfig.ID_TOKEN_PUBLIC_KEY_AS_BASE64,
            // privateKey: appConfig.ID_TOKEN_PRIVATE_KEY,
            // publicKey: appConfig.ID_TOKEN_PUBLIC_KEY,
            signOptions: {
                // algorithm: 'RS256',
                // issuer: 'myapp',
                expiresIn: '30m',
            },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([Store, Product]),
    ],
    controllers: [
        StoreController,
        ProductController,
    ],
    providers: [
        StoreService,
        StoreRepository,
        ProductService,
        ProductRepository
    ],
    exports: [
        StoreService,
        StoreRepository,
        ProductService,
        ProductRepository
    ],
})
export class StoreModule { }
