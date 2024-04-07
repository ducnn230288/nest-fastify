import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import { Auth, AuthUser, Headers, MaxGroup, OnlyUpdateGroup, PaginationQueryDto, SerializerBody } from '@shared';
import {
  BookingService,
  P_BOOKING_CREATE,
  P_BOOKING_LISTED,
  P_BOOKING_DELETE,
  P_BOOKING_DETAIL,
  P_BOOKING_UPDATE,
} from '@service';
import { CreateBookingRequestDto, ListBookingResponseDto, BookingResponseDto, UpdateBookingRequestDto } from '@dto';
import { User } from '@model';

@Headers('booking')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  @Auth({
    summary: 'Get List data',
    permission: P_BOOKING_LISTED,
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListBookingResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'Get Detail data',
    permission: P_BOOKING_DETAIL,
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<BookingResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  @Auth({
    summary: 'Create new booking',
    permission: P_BOOKING_CREATE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup, OnlyUpdateGroup])) dataRequest: CreateBookingRequestDto,
    @AuthUser() user: User,
  ): Promise<BookingResponseDto> {
    const data = await this.service.create({ ...dataRequest, userId: user.id });
    return {
      message: i18n.t('common.Create Success'),
      data: data,
    };
  }

  @Auth({
    summary: 'Update data',
    permission: P_BOOKING_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) updateTeamDto: UpdateBookingRequestDto, //
  ): Promise<BookingResponseDto> {
    const data = await this.service.update(id, updateTeamDto);
    // await this.service.history(data);

    return {
      message: i18n.t('common.Update Success'),
      data,
    };
  }

  @Auth({
    summary: 'Delete data',
    permission: P_BOOKING_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<BookingResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.remove(id),
    };
  }
}
