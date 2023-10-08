import { BadRequestException, Body, Get, Post, Put } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

import {
  Auth,
  AuthUser,
  Headers,
  MaxGroup,
  OnlyUpdateGroup,
  Public,
  RefreshTokenGuard,
  SerializerBody,
  DefaultResponsesDto,
} from '@shared';
import {
  DefaultAuthResponseDto,
  ForgottenPasswordAuthRequestDto,
  LoginAuthRequestDto,
  ProfileAuthRequestDto,
  ProfileAuthResponseDto,
  RegisterAuthRequestDto,
  RestPasswordAuthRequestDto,
  UserResponseDto,
  AuthDto,
  ContactRequestDto,
  OTPConfirmationAuthRequestDto,
  DefaultForgottenPasswordResponseDto,
} from '@dto';
import { User } from '@model';
import { AuthService } from '@service';
import * as argon2 from 'argon2';

@Headers('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public({
    summary: 'Register',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('register')
  async register(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup, OnlyUpdateGroup])) createUserDto: RegisterAuthRequestDto,
  ): Promise<ProfileAuthResponseDto> {
    return {
      message: i18n.t('common.Success'),
      data: await this.authService.register(createUserDto),
    };
  }

  @Public({
    summary: 'Login',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('login')
  async login(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup, OnlyUpdateGroup])) loginAuthDto: LoginAuthRequestDto,
  ): Promise<DefaultAuthResponseDto> {
    const user = await this.authService.login(loginAuthDto);
    const tokens = await this.authService.getTokens(user, true);
    return {
      message: i18n.t('common.Success'),
      data: {
        ...tokens,
        user: user,
      },
    };
  }

  @Get('profile')
  @Auth({
    summary: 'My Profile',
    serializeOptions: { groups: [MaxGroup] },
  })
  async getProfile(@I18n() i18n: I18nContext, @AuthUser() user: User): Promise<UserResponseDto> {
    return {
      message: i18n.t('common.Success'),
      data: user,
    };
  }

  @Put('profile')
  @Auth({
    summary: 'Update my Profile',
    serializeOptions: { groups: [MaxGroup] },
  })
  async updateProfile(
    @I18n() i18n: I18nContext,
    @AuthUser() user: User,
    @Body(new SerializerBody([MaxGroup, OnlyUpdateGroup])) updateData: ProfileAuthRequestDto,
  ): Promise<DefaultAuthResponseDto> {
    const { password, ...body } = updateData;
    const newUser = await this.authService.update(user.id!, body, async (data) => {
      if (
        updateData.passwordOld &&
        (!(await argon2.verify(data.password!, updateData.passwordOld!)) || password !== updateData.retypedPassword)
      )
        throw new BadRequestException(i18n.t('common.Auth.Passwords are not identical'));
      if (updateData.passwordOld) data.password = password;
      return data;
    });
    const tokens = await this.authService.getTokens(newUser!, true);

    return {
      message: i18n.t('common.Success'),
      data: {
        ...tokens,
        user: newUser!,
      },
    };
  }

  @Get('refresh-token')
  @Auth({
    summary: 'Refresh Token',
    tokenGuard: RefreshTokenGuard,
  })
  async refreshTokens(@I18n() i18n: I18nContext, @AuthUser() user: User): Promise<DefaultAuthResponseDto> {
    return {
      message: i18n.t('common.Success'),
      data: (await this.authService.getTokens(user, false)) as AuthDto,
    };
  }

  @Public({
    summary: 'Forgotten password',
  })
  @Post('forgotten-password')
  async forgottenPassword(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: ForgottenPasswordAuthRequestDto,
  ): Promise<DefaultForgottenPasswordResponseDto> {
    const otp = await this.authService.forgottenPassword(body);
    return {
      message: i18n.t('common.Success'),
      data: otp,
    };
  }

  @Public({
    summary: 'OTP confirmation',
  })
  @Post('otp-confirmation')
  async OTPConfirmation(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: OTPConfirmationAuthRequestDto,
  ): Promise<DefaultForgottenPasswordResponseDto> {
    await this.authService.OTPConfirmation(body);
    return {
      message: i18n.t('common.Success'),
      data: !!(await this.authService.OTPConfirmation(body)),
    };
  }

  @Public({
    summary: 'Reset password',
    serializeOptions: { groups: [OnlyUpdateGroup] },
  })
  @Post('reset-password')
  async resetPassword(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([OnlyUpdateGroup])) body: RestPasswordAuthRequestDto,
  ): Promise<DefaultResponsesDto> {
    await this.authService.resetPassword(body);
    return {
      message: i18n.t('common.Success'),
    };
  }

  @Get('logout')
  @Auth({
    summary: 'Logout',
  })
  async logout(@I18n() i18n: I18nContext, @AuthUser() user: User): Promise<UserResponseDto> {
    await this.authService.logout(user);
    return {
      message: i18n.t('common.Success'),
      data: null,
    };
  }

  @Public({
    summary: 'Send email Contact',
  })
  @Post('send-email-contact')
  async sendEmailContact(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup])) body: ContactRequestDto,
  ): Promise<DefaultResponsesDto> {
    await this.authService.sendMailContact(body);
    return {
      message: i18n.t('common.Success'),
    };
  }
}
