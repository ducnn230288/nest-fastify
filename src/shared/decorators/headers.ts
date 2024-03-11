import { applyDecorators, ClassSerializerInterceptor, Controller, UseInterceptors } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

export function Headers(
  name: string,
): <TFunction extends object, Y>(
  target: object | TFunction,
  propertyKey?: string | symbol | undefined,
  descriptor?: TypedPropertyDescriptor<Y> | undefined,
) => void {
  return applyDecorators(
    Controller('/api/' + name),
    ApiTags(capitalizeFirstLetter(name)),
    ApiHeader({ name: 'Accept-Language' }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}

const capitalizeFirstLetter = (string: string): string =>
  string
    .split('/')
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
    .join(' ');
