import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { TypeOrmFilter } from '../common/filters/typeorm.filter';
import { ParseFilePipe } from './parse-file.pipe';
import { AuthGuard } from '../auth/auth.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll() {
    return this.transactionService.getAll();
  }

  @Post('/upload')
  @UseFilters(TypeOrmFilter)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('transactions'))
  async upload(
    @UploadedFile(ParseFilePipe)
    file: Express.Multer.File
  ) {
    return this.transactionService.upload(file.buffer.toString());
  }
}
