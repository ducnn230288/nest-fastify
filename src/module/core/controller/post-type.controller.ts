import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import dayjs from 'dayjs';

import { Auth, Headers, MaxGroup, Public, SerializerBody, PaginationQueryDto } from '@shared';
import { CreatePostTypeRequestDto, PostTypeResponseDto, ListPostTypeResponseDto, UpdatePostTypeRequestDto } from '@dto';
import {
  PostTypeService,
  P_POST_TYPE_CREATE,
  P_POST_TYPE_DELETE,
  P_POST_TYPE_LISTED,
  P_POST_TYPE_UPDATE,
} from '@service';

/**
 * Controller class for handling PostType related operations
 */
@Headers('post/type')
export class PostTypeController {
  /**
   * Constructor to initialize PostTypeController with PostTypeService
   * @param service - An instance of PostTypeService
   */
  constructor(private readonly service: PostTypeService) {}

  /**
   * Find all PostType data with pagination
   * @param i18n - I18nContext for internationalization
   * @param paginationQuery - PaginationQueryDto for pagination options
   * @returns ListPostTypeResponseDto with message, count, and data
   */
  @Auth({
    summary: 'Get List data',
    permission: P_POST_TYPE_LISTED,
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListPostTypeResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  /**
   * Find tree structure data of PostType
   * @param i18n - I18nContext for internationalization
   * @returns ListPostTypeResponseDto with message and data
   */
  @Auth({
    summary: 'Get Tree data',
    permission: P_POST_TYPE_LISTED,
  })
  @Get('tree')
  async findTree(@I18n() i18n: I18nContext): Promise<ListPostTypeResponseDto> {
    return {
      message: i18n.t('common.Get List Success'),
      data: await this.service.findTree(),
    };
  }

  /**
   * Find a specific PostType by id
   * @param i18n - I18nContext for internationalization
   * @param id - The id of the PostType to find
   * @returns PostTypeResponseDto with message and data
   */
  @Public({
    summary: 'Get Detail data',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Get(':id')
  async findOne(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<PostTypeResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOne(id, []),
    };
  }

  /**
   * Create a new PostType
   * @param i18n - I18nContext for internationalization
   * @param body - CreatePostTypeRequestDto containing the data for the new PostType
   * @returns PostTypeResponseDto with message and data of the created PostType
   */
  @Auth({
    summary: 'Create data',
    permission: P_POST_TYPE_CREATE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreatePostTypeRequestDto,
  ): Promise<PostTypeResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.createTree(body),
    };
  }

  /**
   * Update an existing PostType by id
   * @param i18n - I18nContext for internationalization
   * @param id - The id of the PostType to update
   * @param body - UpdatePostTypeRequestDto containing the updated data
   * @returns PostTypeResponseDto with message and data of the updated PostType
   */
  @Auth({
    summary: 'Update data',
    permission: P_POST_TYPE_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdatePostTypeRequestDto,
  ): Promise<PostTypeResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }

  /**
   * Update the disable status of a PostType
   * @param i18n - I18nContext for internationalization
   * @param id - The id of the PostType to update
   * @param boolean - String indicating the disable status
   * @returns PostTypeResponseDto with message and data of the updated PostType
   */
  @Auth({
    summary: 'Update disable',
    permission: P_POST_TYPE_UPDATE,
  })
  @Put(':id/disable/:boolean')
  async updateDisable(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('boolean') boolean: string,
  ): Promise<PostTypeResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, { isDisabled: boolean === 'true' ? dayjs().toDate() : null }),
    };
  }

  /**
   * Remove a PostType by id
   * @param i18n - I18nContext for internationalization
   * @param id - The id of the PostType to remove
   * @returns PostTypeResponseDto with message and data of the removed PostType
   */
  @Auth({
    summary: 'Delete data',
    permission: P_POST_TYPE_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<PostTypeResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.removeCheck(id),
    };
  }
}
