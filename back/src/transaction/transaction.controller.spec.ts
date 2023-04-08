import { Test } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './model/transaction.entity';
import { TransactionType } from './model/transaction-type.entity';

describe('TransactionController', () => {
  let controller: TransactionController;
  let transactionService: TransactionService;

  const createMulterFile = (content: string): Express.Multer.File => ({
    buffer: Buffer.from(content),
    fieldname: 'transactions',
    originalname: 'sales.txt',
    encoding: '7bit',
    mimetype: 'text/plain',
    size: 10_000,
    stream: null,
    destination: '',
    filename: 'sales.txt',
    path: ''
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useClass: Repository
        }
      ]
    }).compile();

    controller = moduleRef.get<TransactionController>(TransactionController);
    transactionService = moduleRef.get<TransactionService>(TransactionService);
  });

  describe('getAll', () => {
    it('should call transactionService.getAll and return transactions', async () => {
      const transactions: any[] = [
        Transaction.construct({
          id: 1207,
          date: new Date('2022-01-15T19:20:30-03:00'),
          product: 'CURSO DE BEM-ESTAR',
          price: '12750',
          seller: 'JOSE CARLOS',
          type: TransactionType.construct({
            id: 1,
            description: 'Venda produtor',
            signal: '+'
          })
        })
      ];
      jest.spyOn(transactionService, 'getAll').mockResolvedValue(transactions);

      const result = await controller.getAll();

      expect(transactionService.getAll).toHaveBeenCalled();
      expect(result).toEqual(transactions);
    });
  });

  describe('upload', () => {
    it('should call transactionService.upload and return parsed transactions', async () => {
      const file = createMulterFile(
        '12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS'
      );
      const parsedTransactions = [
        Transaction.construct({
          id: 1207,
          date: new Date('2022-01-15T19:20:30-03:00'),
          product: 'CURSO DE BEM-ESTAR',
          price: '12750',
          seller: 'JOSE CARLOS',
          type: TransactionType.construct({
            id: 1
          })
        })
      ];

      jest.spyOn(transactionService, 'upload').mockImplementation(async () => {
        return parsedTransactions;
      });

      const result = await controller.upload(file);

      expect(transactionService.upload).toHaveBeenCalledWith(
        file.buffer.toString()
      );
      expect(result).toEqual(parsedTransactions);
    });
  });
});
