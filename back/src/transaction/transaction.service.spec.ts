import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './model/transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionType } from './model/transaction-type.entity';

describe('TransactionService', () => {
  let service: TransactionService;
  let repository: Repository<Transaction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    repository = module.get<Repository<Transaction>>(
      getRepositoryToken(Transaction)
    );
  });

  describe('getAll', () => {
    it('should return all transactions with type relation', async () => {
      const expectedResult = [
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

      jest.spyOn(repository, 'find').mockResolvedValue(expectedResult);

      const result = await service.getAll();

      expect(repository.find).toHaveBeenCalledWith({
        relations: { type: true }
      });

      expect(result).toEqual(expectedResult);
    });
  });

  describe('upload', () => {
    it('should save multiple transactions', async () => {
      const file =
        '12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS\n' +
        '12021-12-03T11:46:02-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA';

      const expectedResult = [
        Transaction.construct({
          date: new Date('2022-01-15T19:20:30-03:00'),
          product: 'CURSO DE BEM-ESTAR',
          price: '12750',
          seller: 'JOSE CARLOS',
          type: TransactionType.construct({
            id: 1
          })
        }),
        Transaction.construct({
          date: new Date('2021-12-03T11:46:02-03:00'),
          product: 'DOMINANDO INVESTIMENTOS',
          price: '50000',
          seller: 'MARIA CANDIDA',
          type: TransactionType.construct({
            id: 1
          })
        })
      ];

      repository.save = jest.fn().mockResolvedValueOnce(expectedResult);

      const result = await service.upload(file);
      expect(repository.save).toHaveBeenCalledWith(expectedResult);

      expect(result).toEqual(expectedResult);
    });

    it('should save a single transaction', async () => {
      const file =
        '12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS';

      const expectedResult = [
        Transaction.construct({
          date: new Date('2022-01-15T19:20:30-03:00'),
          product: 'CURSO DE BEM-ESTAR',
          price: '12750',
          seller: 'JOSE CARLOS',
          type: TransactionType.construct({
            id: 1
          })
        })
      ];

      repository.save = jest.fn().mockResolvedValueOnce(expectedResult);

      const result = await service.upload(file);
      expect(repository.save).toHaveBeenCalledWith(expectedResult);
      expect(result).toEqual(expectedResult);
    });
  });

  it('should ignore empty lines', async () => {
    const file =
      '12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS\n' +
      '\n\n\n\n';

    const expectedResult = [
      Transaction.construct({
        date: new Date('2022-01-15T19:20:30-03:00'),
        product: 'CURSO DE BEM-ESTAR',
        price: '12750',
        seller: 'JOSE CARLOS',
        type: TransactionType.construct({
          id: 1
        })
      })
    ];

    repository.save = jest.fn().mockResolvedValueOnce(expectedResult);

    const result = await service.upload(file);
    expect(repository.save).toHaveBeenCalledWith(expectedResult);
    expect(result).toEqual(expectedResult);
  });
});
