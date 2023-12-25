import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { appConfig } from '@config';
import { CategoryController } from '@controller';
import { Category } from '@model';
import { CategoryService } from '@service';
import { CategoryRepository} from '@repository';

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
        TypeOrmModule.forFeature([Category]),
    ],
    controllers: [
        CategoryController,
    ],
    providers: [
        CategoryService,
        CategoryRepository
    ],
    exports: [
        CategoryService,
        CategoryRepository
    ],
})
export class CategoryModule { }
