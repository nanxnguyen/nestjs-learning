import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ERRORS } from 'src/constants/errors';
import { CustomResponse, HttpException } from '../../constants/response';

@Catch(CustomResponse)
export class CustomResponseFilter implements ExceptionFilter {
  catch(exception: CustomResponse<any> & HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode: number = exception.resultCode === 'NOT_FOUND' ? 200 : 500;
    response.status(statusCode).json({
      message: exception.error,
      resultCode: exception.resultCode,
      data: exception.data,
    });
  }
}

@Catch(HttpException)
export class ErrorMiddleware implements ExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode: number = error.statusCode || 500;
    const message: string = error.message || ERRORS.UNKNOWN.MESSAGE;
    const errorCode: string = error.errorCode || ERRORS.UNKNOWN.CODE;

    response.status(statusCode).json({
      statusCode,
      error: {
        message,
        errorCode,
      },
    });
  }
}
