import { BadRequestException, Body, Get, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Headers, PaginationQueryDto } from '@shared';

import { ListProvinceResponseDto } from '@dto';
import { ProvinceService } from '@service';

@Headers('province')
export class ProvinceController {
    constructor(private readonly service: ProvinceService) {}

    @Get()
    async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    ): Promise<ListProvinceResponseDto> {
        const [result, total] = await this.service.findAll(paginationQuery);
        return {
            message: i18n.t('common.Get List success'),
            count: total,
            data: result,
        };
    }
}