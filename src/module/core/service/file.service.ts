import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MultipartFile } from '@fastify/multipart';

import { I18nContext } from 'nestjs-i18n';
import fs, { promises as fsAsync } from 'fs';
// import { pipeline, Readable } from 'stream';
import dayjs from 'dayjs';
// import util from 'util';
import sharp from 'sharp';
import { join } from 'path';

import { appConfig } from '@config';
import { File } from '@model';
import { BaseService } from '@shared';
import { FileRepository } from '@repository';

export const P_FILE_LISTED = 'f5d6c0fa-f0b7-4b19-a0ae-4bad5393df4e';
export const P_FILE_DETAIL = '750a578a-e346-4e45-ad84-4768f5ffec62';
export const P_FILE_CREATE = '6828ff01-024f-426d-aa81-70cce8d02157';
export const P_FILE_UPDATE = '794f9edf-4d17-42ad-bf6c-374a7ad28f1a';
export const P_FILE_DELETE = '1ed8a391-73e3-4056-bec8-5ad272b463a0';

@Injectable()
export class FileService extends BaseService<File> {
  private logger = new Logger('FileService');
  // private pump = util.promisify(pipeline);
  constructor(public repo: FileRepository) {
    super(repo);
  }

  async uploadFile(userId: string, file: MultipartFile): Promise<File | null> {
    const data = await this.saveToLocalPath(file, /\/(jpg|jpeg|png|gif|webp|svg)$/, '', userId);
    if (!data) throw new BadRequestException(`file is not null`);
    const createData = await this.create({ userId, url: data.filename, type: 0 });
    createData!.url = appConfig.URL_FILE + createData?.url;
    return createData;
  }

  /**
   * It uploads a file to cloudinary, creates a file entity in the database, and returns the file
   * entity
   * @param file - MultipartFile - The file object that Multer has created for us.
   * @param {number} userId - The userId of the user who uploaded the image.
   * @param {string} [tags] - tags ? tags : `avatars`,
   * @returns The file entity
   */
  // async uploadImageToCloudinary(file: MultipartFile, userId: number, tags?: string): Promise<File | null> {
  // try {
  //   if (!file) {
  //     throw new NotFoundError(ErrorMessageCode.NOT_FOUND);
  //   }
  //   const path = process.cwd() + `/${UPLOAD_LOCATION}/${file.filename}`;
  //   const uniqueFileName = Date.now() + '-' + file.filename;
  //   const imagePublicId = `file/${uniqueFileName}`;
  //
  //   const image = await cloudinary.uploader.upload(path, {
  //     public_id: imagePublicId,
  //     tags: tags ? tags : `avatars`,
  //     quality: 60,
  //   });
  //
  //   const createFile = new FileEntity({});
  //   createFile.originUrl = image.url;
  //   createFile.width = image.width;
  //   createFile.height = image.height;
  //   createFile.size = image.bytes;
  //   createFile.publicId = image.public_id;
  //   createFile.userId = userId || null;
  //   createFile.data = JSON.stringify(image);
  //   await this._store(createFile);
  //   fs.unlinkSync(path);
  //   return createFile;
  // } catch (e) {
  //   console.log(e);
  //   throw e;
  // }
  // return null;
  // }

  /**
   * It takes a request, checks if the request has a file, if it does, it checks if the file is an
   * image, if it is, it saves the file to the server
   * @param {MultipartFile} multipartFile - The file object that Multer has created for us.
   * @param {any} mimeTypesRegex - The request object
   * @param {string} validationErrorMessage - The message return when error
   * @param userId
   * @returns A MultipartFile object
   */
  private async saveToLocalPath(
    multipartFile: MultipartFile,
    mimeTypesRegex?: RegExp,
    validationErrorMessage?: string,
    userId?: string,
  ): Promise<{
    filename: string;
    filepath: string;
  } | null> {
    // https://backend.cafe/fastify-multipart-upload
    this.logger.verbose(`File received: ${multipartFile.filename} (${multipartFile.mimetype})`);
    if (mimeTypesRegex && !multipartFile.mimetype.match(mimeTypesRegex)) {
      throw new BadRequestException(validationErrorMessage);
    }

    try {
      fs.mkdirSync(appConfig.UPLOAD_LOCATION, { recursive: true });
      fs.mkdirSync(appConfig.UPLOAD_LOCATION + userId, { recursive: true });

      multipartFile.filename = `${userId}/${this.renameFile(multipartFile.filename)}`;
      const tmpFilename = appConfig.UPLOAD_LOCATION + multipartFile.filename;

      await sharp(await multipartFile.toBuffer())
        .webp({ effort: 3 })
        .toFile(tmpFilename);
      // const localFile = fs.createWriteStream(tmpFilename);
      // await this.pump(multipartFile.file, localFile);

      this.logger.verbose(`File saved localy: ${tmpFilename} (${multipartFile.mimetype})`);

      return {
        filename: multipartFile.filename,
        filepath: tmpFilename,
      };
    } catch (error) {
      this.logger.error(`Error while saving file ${multipartFile.filename}: ${error}`);
      return null;
    }
  }

  deleteFromLocalPath(filePath: string): void {
    fsAsync
      .unlink(filePath)
      .then(() => this.logger.verbose(`File deleted successfully ${filePath}`))
      .catch((error) => this.logger.error(`Error while deleting file ${filePath}: ${error}`));
  }

  // readFile(filepath: string, transform: Transform, onData: (data) => Promise<void>, onEnd: () => Promise<void>) {
  //   fs.createReadStream(filepath).pipe(transform).on('data', onData).on('end', onEnd);
  // }
  // private static async streamToBuffer(stream: Readable): Promise<Buffer> {
  //   const buffer: Uint8Array[] = [];
  //
  //   return new Promise((resolve, reject) =>
  //     stream
  //       .on('error', (error) => reject(error))
  //       .on('data', (data) => buffer.push(data))
  //       .on('end', () => resolve(Buffer.concat(buffer))),
  //   );
  // }
  private renameFile(filename: string): string {
    const name = filename.split('.')[0];
    // const fileExtName = extname(filename);
    const nowAsString = dayjs().format('YYYYMMDDHHmmss');
    return `${name}-${nowAsString}.webp`;
  }

  async activeFiles(urls: string[]): Promise<void> {
    for (const url of urls) {
      const data = await this.repo.getDataByUrl(url);
      if (data?.id) await this.update(data.id, { status: 1 });
    }
  }

  async removeFiles(urls: string[]): Promise<void> {
    for (const url of urls) {
      await this.removeHard(url);
    }
  }

  async removeHard(url: string): Promise<File | null> {
    const data = await this.repo.getDataByUrl(url);
    if (data) await this.removeFile(data);
    return data;
  }

  async removeFile(data: File, i18n?: I18nContext): Promise<void> {
    if (data?.id) {
      const res = await this.repo.delete(data.id);
      if (!res.affected && i18n) {
        throw new BadRequestException(i18n.t('common.Data id not found', { args: { id: data.id } }));
      }
      switch (data.type) {
        case 0:
          this.deleteFromLocalPath(
            join(process.cwd(), appConfig.UPLOAD_LOCATION, data?.url.replace(appConfig.URL_FILE, '')),
          );
      }
    }
  }
}
