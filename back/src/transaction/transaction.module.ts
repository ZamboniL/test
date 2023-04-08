import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionType } from './model/transaction-type.entity';
import { Transaction } from './model/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionType, Transaction])],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
