import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from '@shared';
import { File } from '@model';
import { MultipartFile } from '@fastify/multipart';
import fs, { promises as fsAsync } from 'fs';
import { pipeline } from 'stream';
import { extname } from 'path';
import dayjs from 'dayjs';
import util from 'util';
import { appConfig } from '@config';
import path from 'path';
import sharp from 'sharp';
import { Readable } from 'stream';

export const P_FILE_LISTED = '5d808d76-bf99-4a51-b4b6-d5aa37bdb398';
export const P_FILE_DETAIL = 'eb510a79-4f75-4b14-a118-f036c1daa430';
export const P_FILE_CREATE = 'a9574d5e-269d-44f9-a5bb-41cf06d7bdda';
export const P_FILE_UPDATE = '6d34b679-9c0e-489a-a2de-a17e37fadf72';
export const P_FILE_DELETE = 'e21ac25b-1651-443e-9834-e593789807c9';

@Injectable()
export class FileService extends BaseService<File> {
  private logger = new Logger('StorageService');
  private pump = util.promisify(pipeline);
  constructor(
    @InjectRepository(File)
    public repo: Repository<File>,
  ) {
    super(repo);
  }

  async uploadFile(userId: string, file: MultipartFile): Promise<File | null> {
    const data = await this.saveToLocalPath(file, /\/(jpg|jpeg|png|gif)$/, '', userId);
    if (!data) throw new BadRequestException(`file is not null`);
    const createData = await this.create({ userId, url: data.filename, type: 0 });
    createData!.url = appConfig.DOMAIN + '/api/file/' + createData?.url;
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
  async uploadImageToCloudinary(file: MultipartFile, userId: number, tags?: string): Promise<File | null> {
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
    return null;
  }

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
    mimeTypesRegex?: any,
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
      // const localFile = fs.createWriteStream(tmpFilename);
      await sharp(await multipartFile.toBuffer())
        .webp({ effort: 3 })
        .toFile(tmpFilename);
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
  private static async streamToBuffer(stream: Readable): Promise<Buffer> {
    const buffer: Uint8Array[] = [];

    return new Promise((resolve, reject) =>
      stream
        .on('error', (error) => reject(error))
        .on('data', (data) => buffer.push(data))
        .on('end', () => resolve(Buffer.concat(buffer))),
    );
  }
  private renameFile(filename: string): string {
    const name = filename.split('.')[0];
    // const fileExtName = extname(filename);
    const nowAsString = dayjs().format('YYYYMMDDHHmmss');
    return `${name}-${nowAsString}.webp`;
  }
}
