import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
// import { S3 } from 'aws-sdk';
import { I18nContext } from 'nestjs-i18n';

import { customAlphabet } from 'nanoid/non-secure';

import {
  ContactRequestDto,
  ForgottenPasswordAuthRequestDto,
  LoginAuthRequestDto,
  OTPConfirmationAuthRequestDto,
  RegisterAuthRequestDto,
  RestPasswordAuthRequestDto,
} from '@dto';
import { BaseService } from '@shared';
import { User } from '@model';
import { EmailService } from '@service';
import { UserRepository } from '@repository';
import { appConfig } from '@config';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';

export const P_AUTH_DELETE_IMAGE_TEMP = '11cc566b-b109-49f8-983f-84ff08f9849e';

@Injectable()
export class AuthService extends BaseService<User> {
  // private logger = new Logger('AuthService');
  constructor(
    public readonly repo: UserRepository,
    private readonly jwtService: JwtService,
    private emailService: EmailService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    super(repo);
  }

  /**
   *
   * @param userId
   * @param refreshToken
   * @returns void
   *
   */
  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.update(userId, { refreshToken });
  }

  /**
   *
   * @param user
   * @param returnRefresh
   * @returns { accessToken, refreshToken }
   *
   */
  async getTokens(
    user: User,
    returnRefresh = true,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId: user.id, email: user.email },
        { secret: appConfig.ACCESS_SECRET, expiresIn: '30m' },
      ),
      returnRefresh
        ? this.jwtService.signAsync(
            { userId: user.id, email: user.email },
            { secret: appConfig.REFRESH_SECRET, expiresIn: '1d' },
          )
        : '',
    ]);

    if (returnRefresh) await this.updateRefreshToken(user.id!, refreshToken!);
    return { accessToken, refreshToken };
  }

  /**
   *
   * @param user
   * @returns User
   *
   */
  async logout(user: User): Promise<User | null> {
    return await this.update(user.id!, { refreshToken: null });
  }

  /**
   *
   * @param body
   * @returns boolean
   *
   */
  async forgottenPassword(body: ForgottenPasswordAuthRequestDto): Promise<string> {
    const i18n = I18nContext.current()!;
    const user = await this.repo.getDataByEmail(body.email!);
    if (!user) throw new BadRequestException(i18n.t('common.Auth.Invalid email'));

    user.otp = customAlphabet('0123456789', 10)(6);
    await this.update(user.id!, user);
    // if (!body.notSendEmail) await this.emailService.sendUserConfirmation(user, user.otp);

    const name = user.id + 'forgottenPassword';
    if (this.schedulerRegistry.doesExist('cron', name)) this.schedulerRegistry.deleteCronJob(name);
    const job = new CronJob(`0 */5 * * * *`, () => {
      this.update(user.id!, { otp: null });
      this.schedulerRegistry.deleteCronJob(name);
    });
    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    return user.otp;
  }

  /**
   *
   * @param body
   * @returns boolean
   *
   */
  async OTPConfirmation(body: OTPConfirmationAuthRequestDto): Promise<User> {
    const i18n = I18nContext.current()!;
    const user = await this.repo.getDataByEmailAndOTP(body.email!, body.otp!);
    if (!user) throw new BadRequestException(i18n.t('common.Auth.Invalid email'));
    return user;
  }

  /**
   *
   * @param body
   * @returns boolean
   *
   */
  async sendMailContact(body: ContactRequestDto): Promise<boolean> {
    await this.emailService.sendUserContact(body);
    return true;
  }

  /**
   *
   * @param email
   * @param otp
   * @param body
   * @returns boolean
   *
   */
  async resetPassword({ email, otp, ...body }: RestPasswordAuthRequestDto): Promise<boolean> {
    const i18n = I18nContext.current()!;
    const user = await this.OTPConfirmation({ email, otp });
    if (body.password === body.retypedPassword) await this.update(user.id!, { password: body.password, otp: null });
    else throw new UnauthorizedException(i18n.t('common.Auth.Password do not match'));

    const name = user.id + 'forgottenPassword';
    if (this.schedulerRegistry.doesExist('cron', name)) this.schedulerRegistry.deleteCronJob(name);
    return true;
  }

  /**
   *
   * @param body
   * @returns User
   *
   */
  async login(body: LoginAuthRequestDto): Promise<User> {
    const i18n = I18nContext.current()!;
    const user = await this.repo.getDataByEmailJoin(body.email!);
    if (!user) throw new UnauthorizedException(i18n.t('common.Auth.User not found', { args: { email: body.email } }));

    if (!(await argon2.verify(user.password!, body.password!)))
      throw new UnauthorizedException(
        i18n.t('common.Auth.Invalid credentials for user', { args: { email: body.email } }),
      );

    return user;
  }

  /**
   *
   * @param body
   * @returns User
   *
   */
  async register(body: RegisterAuthRequestDto): Promise<User> {
    const i18n = I18nContext.current()!;
    if (body.password !== body.retypedPassword)
      throw new BadRequestException(i18n.t('common.Auth.Passwords are not identical'));

    const existingUser = await this.repo.getDataByEmail(body.email!);
    if (existingUser) throw new BadRequestException(i18n.t('common.Auth.Email is already taken'));

    const user = this.repo.create(body);
    const data = await this.repo.save(user);
    // await this.emailService.sendUserConfirmation(user, 'token');
    return data;
  }

  // async getListS3() {
  //   return new Promise((resolve, reject) => {
  //     new S3({
  //       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //     }).listObjectsV2(
  //       {
  //         Bucket: process.env.AWS_ACCESS_BUCKET_NAME,
  //         Delimiter: '/',
  //         Prefix: 'avata-dev/',
  //       },
  //       (err, data) => {
  //         if (err) {
  //           console.log(err);
  //           reject(err.message);
  //         }
  //         resolve(data);
  //       },
  //     );
  //   });
  // }
  // async checkDeleteFile(fileName: string) {
  // let data = await this.repo
  //   .createQueryBuilder('base')
  //   .andWhere(`base.avatar like :avatar`, { avatar: '%' + fileName })
  //   .getCount();
  //
  // if (!data) {
  //   data = await this.repoData
  //     .createQueryBuilder('base')
  //     .andWhere(`base.image like :image`, { image: '%' + fileName })
  //     .getCount();
  // }
  // if (!data) {
  //   const dataTemp = await this.repoPost.find({});
  //   dataTemp.forEach((item: Page) => {
  //     item.content.forEach((subItem: any) => {
  //       if (!data && subItem.image && subItem.image.indexOf(fileName) === (process.env.DOMAIN + 'files/').length) {
  //         data = 1;
  //       }
  //       if (!data && subItem?.content?.blocks?.length > 0) {
  //         subItem?.content?.blocks.forEach((block: any) => {
  //           if (!data && block?.data?.file?.url.indexOf(fileName) === (process.env.DOMAIN + 'files/').length) {
  //             data = 1;
  //           }
  //         });
  //       }
  //     });
  //   });
  // }
  // if (!data && process.env.AWS_ACCESS_KEY_ID) {
  //   new S3({
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   }).deleteObject(
  //     {
  //       Bucket: process.env.AWS_ACCESS_BUCKET_NAME,
  //       Key: fileName,
  //     },
  //     (err, data) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.log(data);
  //     },
  //   );
  // }
  // return data;
  // }
}
