import { BadRequestException, Body, Get, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, Headers, PaginationQueryDto, SerializerBody } from '@shared';

import { ListAddressResponseDto, AddressResponseDto, CreateAddressRequestDto } from '@dto';
import { 
    AddressService, 
    P_ADDRESS_LISTED 
} from '@service';

@Headers('address')
export class AddressController {
    constructor(private readonly service: AddressService) {}

    // @Auth({
    //     summary: 'Get List data',
    //     permission: P_ADDRESS_LISTED,
    // })
    @Get()
    async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    ): Promise<ListAddressResponseDto> {
        const [result, total] = await this.service.findAll(paginationQuery);
        return {
            message: i18n.t('common.Get List success'),
            count: total,
            data: result,
        };
    }
}