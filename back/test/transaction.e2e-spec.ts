import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Transaction', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST /transaction/upload', () => {
    it('should return 200', () => {
      return request(app.getHttpServer())
        .post('/transaction/upload')
        .attach(
          'transactions',
          Buffer.from(
            '12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS'
          ),
          { filename: 'test.txt' }
        )
        .expect(201);
    });

    it('should return 400 when file has invalid transaction type', () => {
      return request(app.getHttpServer())
        .post('/transaction/upload')
        .attach(
          'transactions',
          Buffer.from(
            '82022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS'
          ),
          { filename: 'test.txt' }
        )
        .expect(400);
    });

    it('should return 400 when no file is uploaded', () => {
      return request(app.getHttpServer())
        .post('/transaction/upload')
        .expect(400);
    });

    it('should return 400 when file is too big', () => {
      return request(app.getHttpServer())
        .post('/transaction/upload')
        .attach('transactions', Buffer.alloc(5001), { filename: 'test.txt' })
        .expect(400);
    });

    it('should return 400 when file is not a text file', () => {
      return request(app.getHttpServer())
        .post('/transaction/upload')
        .attach('transactions', Buffer.alloc(5000), { filename: 'test.pdf' })
        .expect(400);
    });
  });

  describe('GET /transaction', () => {
    it('should return 200', () => {
      return request(app.getHttpServer()).get('/transaction').expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
