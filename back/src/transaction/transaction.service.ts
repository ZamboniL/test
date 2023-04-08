import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './model/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionType } from './model/transaction-type.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ) {}

  async getAll(): Promise<Transaction[]> {
    return this.transactionRepository.find({ relations: { type: true } });
  }

  async upload(file: string): Promise<Transaction[]> {
    const transactions = this.parseFile(file);

    return await this.transactionRepository.save(transactions);
  }

  private parseFile(file: string): Transaction[] {
    const result: Transaction[] = [];

    file.split('\n').forEach((line) => {
      if (!line.length) return;

      const parsedTransaction = this.parseLine(line);

      result.push(parsedTransaction);
    });

    return result;
  }

  private parseLine(line: string): Transaction {
    const typeId = parseInt(line[0]);
    const date = new Date(line.slice(1, 26));
    const product = line.slice(26, 56).trimEnd();
    const price = this.removeLeadingZeros(line.slice(56, 66));
    const seller = line.slice(66);

    const transactionType = TransactionType.construct({ id: typeId });
    const transaction = Transaction.construct({
      type: transactionType,
      date,
      product,
      price,
      seller
    });

    return transaction;
  }

  private removeLeadingZeros(value: string): string {
    return value.replace(/^0+/, '');
  }
}
