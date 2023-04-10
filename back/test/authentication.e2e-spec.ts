import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Authentication', () => {
  let app: INestApplication;
  let token: string;
  const testUser = {
    name: 'Test',
    email: 'e2euserstest@test.com',
    password: '123456'
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    })
      .setLogger({ error: jest.fn(), log: jest.fn(), warn: jest.fn() })
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('POST /users', () => {
    it('should return 201', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(testUser)
        .expect(201);
    });

    it('should return 400 when e-mail is already in use', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(testUser)
        .expect(400);
    });
  });

  describe('POST /auth/login', () => {
    it('should return 200 and return a jwtToken', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(res.body).toHaveProperty('token');

      token = res.body.token;
      return;
    });
  });

  describe('DELETE /users', () => {
    it('should return 401 when no token is provided', () => {
      return request(app.getHttpServer()).delete('/users').expect(401);
    });

    it('should return 200', () => {
      return request(app.getHttpServer())
        .delete('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should return 401 when token is for non-existent user', () => {
      return request(app.getHttpServer())
        .delete('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
