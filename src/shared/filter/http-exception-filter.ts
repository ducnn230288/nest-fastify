import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, NotFoundException } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    if (exception instanceof NotFoundException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      return response.view('404', { title: '404 - The page you were looking for is not found!' });
    }
    const logger = new Logger('HttpExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus ? exception.getStatus() : 503;
    logger.error(`Uncaught exception ${status} ${request.url}`, exception.stack);
    response
      .status(status)
      .send(status !== 500 ? (exception.getResponse ? exception.getResponse() : exception) : exception.stack);
  }
}
