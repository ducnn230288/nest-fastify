import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const logger = new Logger('HttpExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    logger.error(`Uncaught exception ${status} ${request.url}`, exception.stack);
    response.status(status).send(exception.getResponse());
  }
}
