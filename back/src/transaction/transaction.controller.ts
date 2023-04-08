import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TypeOrmFilter } from '../common/filters/typeorm.filter';
import { ParseFilePipe } from './parse-file.pipe';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/')
  async getAll() {
    return this.transactionService.getAll();
  }

  @Post('/upload')
  @UseFilters(TypeOrmFilter)
  @UseInterceptors(FileInterceptor('transactions'))
  async upload(
    @UploadedFile(ParseFilePipe)
    file: Express.Multer.File
  ) {
    return this.transactionService.upload(file.buffer.toString());
  }
}
