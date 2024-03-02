import { Body, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import dayjs from 'dayjs';

import { Auth, Headers, SerializerBody, MaxGroup, PaginationQueryDto } from '@shared';
import {
  CodeTypeResponseDto,
  CodeTypeRelationshipResponseDto,
  ListCodeTypeResponseDto,
  CreateCodeTypeRequestDto,
  UpdateCodeTypeRequestDto,
} from '@dto';
import {
  CodeTypeService,
  P_CODE_TYPE_LISTED,
  P_CODE_TYPE_DETAIL,
  P_CODE_TYPE_CREATE,
  P_CODE_TYPE_UPDATE,
  P_CODE_TYPE_DELETE,
} from '@service';

/**
 * Controller for handling CRUD operations related to CodeType entities
 */
@Headers('code/type')
export class CodeTypeController {
  /**
   * Constructor for CodeTypeController
   * @param service Instance of CodeTypeService for handling business logic
   */
  constructor(private readonly service: CodeTypeService) {}

  /**
   * Retrieve a list of CodeType entities with pagination
   * @param i18n I18nContext object for internationalization
   * @param paginationQuery Object containing pagination query parameters
   * @returns Promise<ListCodeTypeResponseDto> List of CodeType entities with total count
   */
  @Auth({
    summary: 'Get List data',
    permission: P_CODE_TYPE_LISTED,
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListCodeTypeResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  /**
   * Retrieve a single CodeType entity by code
   * @param i18n I18nContext object for internationalization
   * @param code CodeType identifier
   * @returns Promise<CodeTypeRelationshipResponseDto> CodeType entity with relationships
   */
  @Auth({
    summary: 'Get Detail data',
    serializeOptions: { groups: [MaxGroup] },
    permission: P_CODE_TYPE_DETAIL,
  })
  @Get(':code')
  async findOne(@I18n() i18n: I18nContext, @Param('code') code: string): Promise<CodeTypeRelationshipResponseDto> {
    return {
      message: i18n.t('common.Get Detail Success'),
      data: await this.service.findOneCode(code, i18n),
    };
  }

  /**
   * Create a new CodeType entity
   * @param i18n I18nContext object for internationalization
   * @param body Data for creating a new CodeType entity
   * @returns Promise<CodeTypeResponseDto> Created CodeType entity
   */
  @Auth({
    summary: 'Create data',
    permission: P_CODE_TYPE_CREATE,
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: CreateCodeTypeRequestDto,
  ): Promise<CodeTypeResponseDto> {
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.create(body),
    };
  }

  /**
   * Update an existing CodeType entity
   * @param i18n I18nContext object for internationalization
   * @param id Identifier of the CodeType entity to update
   * @param body Data for updating the CodeType entity
   * @returns Promise<CodeTypeResponseDto> Updated CodeType entity
   */
  @Auth({
    summary: 'Update data',
    permission: P_CODE_TYPE_UPDATE,
  })
  @Put(':id')
  async update(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Body(new SerializerBody()) body: UpdateCodeTypeRequestDto,
  ): Promise<CodeTypeResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, body),
    };
  }

  /**
   * Update the 'isDisabled' property of a CodeType entity
   * @param i18n I18nContext object for internationalization
   * @param id Identifier of the CodeType entity to update
   * @param boolean Flag indicating whether to disable the entity
   * @returns Promise<CodeTypeResponseDto> Updated CodeType entity
   */
  @Auth({
    summary: 'Update disable',
    permission: P_CODE_TYPE_UPDATE,
  })
  @Put(':id/disable/:boolean')
  async updateDisable(
    @I18n() i18n: I18nContext,
    @Param('id') id: string,
    @Param('boolean') boolean: string,
  ): Promise<CodeTypeResponseDto> {
    return {
      message: i18n.t('common.Update Success'),
      data: await this.service.update(id, { isDisabled: boolean === 'true' ? dayjs().toDate() : null }),
    };
  }

  /**
   * Delete a CodeType entity
   * @param i18n I18nContext object for internationalization
   * @param id Identifier of the CodeType entity to delete
   * @returns Promise<CodeTypeResponseDto> Deleted CodeType entity
   */
  @Auth({
    summary: 'Delete data',
    permission: P_CODE_TYPE_DELETE,
  })
  @Delete(':id')
  async remove(@I18n() i18n: I18nContext, @Param('id') id: string): Promise<CodeTypeResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.removeHard(id),
    };
  }
}
