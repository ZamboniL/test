import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { TypeOrmFilter } from '../common/filters/typeorm.filter';
import { ParseFilePipe } from './parse-file.pipe';
import { AuthGuard } from '../auth/auth.guard';
import { FileDto } from './model/file.dto';
import { Transaction } from './model/transaction.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiBearerAuth()
  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<Transaction[]> {
    return this.transactionService.getAll();
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of transactions',
    type: FileDto
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('/upload')
  @UseFilters(TypeOrmFilter)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('transactions'))
  async upload(
    @UploadedFile(ParseFilePipe)
    file: Express.Multer.File
  ): Promise<Transaction[]> {
    return this.transactionService.upload(file.buffer.toString());
  }
}
