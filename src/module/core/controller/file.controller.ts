import { FastifyReply, FastifyRequest } from 'fastify';
import {
  BadRequestException,
  Get,
  Param,
  Post,
  Query,
  Req,
  ValidationPipe,
  Res,
  StreamableFile,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { join } from 'path';
import mime from 'mime-types';
import { I18n, I18nContext } from 'nestjs-i18n';
import { createReadStream, existsSync, statSync } from 'fs';

import { appConfig } from '@config';
import { FileResponseDto, ListFileResponseDto } from '@dto';
import { User } from '@model';
import { FileService, P_FILE_LISTED, P_FILE_CREATE, P_FILE_DELETE } from '@service';
import { Auth, Headers, AuthUser, PaginationQueryDto, Public } from '@shared';

@Headers('file')
export class FileController {
  constructor(private readonly service: FileService) {}

  @Auth({
    summary: 'Get List data',
    permission: P_FILE_LISTED,
  })
  @Get('')
  async findAll(
    @I18n() i18n: I18nContext,
    @Query(new ValidationPipe({ transform: true })) paginationQuery: PaginationQueryDto,
  ): Promise<ListFileResponseDto> {
    const [result, total] = await this.service.findAll(paginationQuery);
    return {
      message: i18n.t('common.Get List Success'),
      count: total,
      data: result,
    };
  }

  @Auth({
    summary: 'File image',
    permission: P_FILE_CREATE,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('')
  async create(
    @I18n() i18n: I18nContext,
    @Req() req: FastifyRequest,
    @AuthUser() user: User,
  ): Promise<FileResponseDto> {
    const file = await req.file();
    if (!file) new BadRequestException(i18n.t('common.Data id not found'));
    return {
      message: i18n.t('common.Create Success'),
      data: await this.service.uploadFile(user.id!, file!),
    };
  }

  @Public({
    summary: 'View file',
  })
  @Get('/:userId/:name')
  async stream(
    @Param('userId') userId: string,
    @Param('name') name: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<StreamableFile | undefined> {
    const filePath = join(process.cwd(), appConfig.UPLOAD_LOCATION, `${userId}/${name}`);
    if (!existsSync(filePath)) throw new BadRequestException();
    const { size } = statSync(filePath);
    const contentType = mime.contentType(filePath.split('.').pop());
    const header = {
      'Content-Type': contentType,
      'Content-Length': size,
    };
    // if (filter.download === true) {
    //   header['Content-Disposition'] = contentDisposition(filePath);
    // }
    if (contentType.includes('video')) {
      // const videoRange = headers.range;
      // const CHUNK_SIZE = 10 * 10 ** 6; // 10 MB
      // if (videoRange) {
      //   const start = Number(videoRange.replace(/\D/g, ''));
      //   const end = Math.min(start + CHUNK_SIZE, size - 1);
      //   const contentLength = end - start + 1;
      //   const readStreamfile = createReadStream(filePath, {
      //     start,
      //     end,
      //   });
      //   const head = {
      //     'Accept-Ranges': 'bytes',
      //     'Content-Type': contentType,
      //     'Content-Range': `bytes ${start}-${end}/${size}`,
      //     'Content-Length': contentLength,
      //   };
      //   res.status(HttpStatus.PARTIAL_CONTENT).headers(head); //206
      //   return new StreamableFile(readStreamfile);
      // } else {
      //   const head = {
      //     'Accept-Ranges': 'bytes',
      //     'Content-Type': contentType,
      //     'Content-Length': size,
      //   };
      //   res.status(HttpStatus.OK).headers(head); //200
      //   // createReadStream(videoPath).pipe(res);
      //   const readStreamfile = createReadStream(filePath);
      //   return new StreamableFile(readStreamfile);
      // }
    } else {
      res.headers(header);
      const file = createReadStream(filePath);
      return new StreamableFile(file);
    }
  }

  @Auth({
    summary: 'Delete data',
    permission: P_FILE_DELETE,
  })
  @Delete(':url')
  async remove(@I18n() i18n: I18nContext, @Param('url') url: string): Promise<FileResponseDto> {
    return {
      message: i18n.t('common.Delete Success'),
      data: await this.service.removeHard(url),
    };
  }
}
