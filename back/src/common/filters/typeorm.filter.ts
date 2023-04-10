import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmFilter extends BaseExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const message: string = exception.driverError.detail;
    const code: string = exception.driverError.code;
    const { column, value } = this.getErrorColumnAndValue(message);

    switch (code) {
      case '23503':
        response.status(400).json({
          statusCode: 400,
          message: `'${value}' is not a valid '${column}'.`,
          error: 'Bad Request'
        });

        break;
      case '23505':
        response.status(400).json({
          statusCode: 400,
          message: `'${value}' is already used.`,
          error: 'Bad Request'
        });
      default:
        super.catch(exception, host);
        break;
    }
  }

  private getErrorColumnAndValue(message: string) {
    const column = message.slice(
      message.indexOf('(') + 1,
      message.indexOf(')')
    );

    const value = message.slice(
      message.indexOf('=(') + 2,
      message.indexOf(') ')
    );
    return { column, value };
  }
}
