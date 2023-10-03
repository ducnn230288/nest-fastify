import { BadRequestException, Body, Get, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Headers, PaginationQueryDto } from '@shared';

import { ListDistrictResponseDto } from '@dto';
import { DistrictService } from '@service';

@Headers('district')
export class DistrictController {
    constructor(private readonly service: DistrictService) {}

    @Get()
    async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    ): Promise<ListDistrictResponseDto> {
        const [result, total] = await this.service.findAll(paginationQuery);
        return {
            message: i18n.t('common.Get List success'),
            count: total,
            data: result,
        };
    }
}