export class CustomResponse<D> {
  data: D | D[];
  resultCode: string;
  error: object | any;

  constructor(data: D | D[], resultCode: string, error: object | any | string) {
    this.data = data;
    this.resultCode = resultCode;
    this.error = error;
  }
}

export class HttpException extends Error {
  public statusCode: number;
  public message: string;
  public errorCode: string;
  public extraParams: string;

  constructor(data: {
    statusCode: number;
    message: string;
    errorCode: string;
  }) {
    super(data.message);
    this.statusCode = data.statusCode;
    this.message = data.message;
    this.errorCode = data.errorCode;
  }
}

export class HttpBadRequest extends HttpException {
  constructor(message = 'Bad Request', code = 'BAD_REQUEST') {
    super({ statusCode: 400, message, errorCode: code });
  }
}

export class HttpNotFound extends HttpException {
  constructor(message = 'Not Found', code = 'NOT_FOUND') {
    super({ statusCode: 404, message, errorCode: code });
  }
}

export class HttpInternalServerError extends HttpException {
  constructor(message = 'Internal Server Error', code = 'INTERNAL_ERROR') {
    super({ statusCode: 500, message, errorCode: code });
  }
}
