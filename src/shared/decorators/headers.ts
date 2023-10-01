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
    ApiTags(name),
    ApiHeader({ name: 'Accept-Language' }),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
