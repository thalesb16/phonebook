import { HttpException, HttpStatus } from '@nestjs/common';

export class ContactsExceptions {
  static ObjectIdError() {
    throw new HttpException(
      {
        statusCode: 400,
        error: 'Bad Request',
        message: 'invalid ObjectId',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  static NotFoundError() {
    throw new HttpException(
      {
        statusCode: 400,
        error: 'Bad Request',
        message: 'contact not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
