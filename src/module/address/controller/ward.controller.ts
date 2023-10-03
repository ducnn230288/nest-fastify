import { BadRequestException, Body, Get, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Headers, PaginationQueryDto } from '@shared';

import { ListWardResponseDto } from '@dto';
import { WardService } from '@service';

@Headers('ward')
export class WardController {
    constructor(private readonly service: WardService) {}

    @Get()
    async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
    ): Promise<ListWardResponseDto> {
        const [result, total] = await this.service.findAll(paginationQuery);
        return {
            message: i18n.t('common.Get List success'),
            count: total,
            data: result,
        };
    }
}