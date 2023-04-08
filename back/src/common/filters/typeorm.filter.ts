import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmFilter extends BaseExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const message: string = exception.driverError.detail;
    const code: string = exception.driverError.code;

    switch (code) {
      case '23503':
        response.status(400).json({
          statusCode: 400,
          message: this.getForeignKeyError(message),
          error: 'Bad Request'
        });

        break;
      default:
        super.catch(exception, host);
        break;
    }
  }

  private getForeignKeyError(message: string) {
    const columnName = message.slice(
      message.indexOf('(') + 1,
      message.indexOf(')')
    );

    const value = message.slice(
      message.indexOf('=(') + 2,
      message.indexOf(') ')
    );

    return `'${value}' is not a valid '${columnName}'.`;
  }
}
