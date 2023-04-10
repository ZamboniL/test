import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export const setupAuth = async (app: INestApplication) => {
  let token: string;

  try {
    const res = await request(app.getHttpServer()).post('/auth/login').send({
      email: 'test@gmail.com',
      password: '123456'
    });

    token = res.body.token;
  } catch (error) {
    await request(app.getHttpServer()).post('/users').send({
      name: 'Test',
      email: 'test@gmail.com',
      password: '123456'
    });

    return setupAuth(app);
  }
  return token;
};
