class HttpException extends Error {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export class NotFoundException extends HttpException {
  message: string;
  constructor(message: string) {
    super(message, 500);
    this.message = message;
  }
}

export class UpdateException extends HttpException {
  message: string;
  constructor(message: string = "could not update data") {
    super(message, 500);
    this.message = message;
  }
}

export class CreateException extends HttpException {
  message: string;
  constructor(message: string = "could not create data") {
    super(message, 500);
    this.message = message;
  }
}

export class GetDataException extends HttpException {
  message: string;
  constructor(message: string = "Could not get data") {
    super(message, 500);
    this.message = message;
  }
}

export class DeleteException extends HttpException {
  message: string;
  constructor(message: string = "could not delete data") {
    super(message, 500);
    this.message = message;
  }
}
