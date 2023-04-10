import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: UsersService, useClass: class Stub {} },
        { provide: JwtService, useClass: class Stub {} }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a token', async () => {
      const signInDto = {
        email: 'test@gmail.com',
        password: '123456'
      };

      jest
        .spyOn(authService, 'signIn')
        .mockImplementation(async () => ({ token: 'token' }));

      const result = await controller.signIn(signInDto);

      expect(result).toEqual({ token: 'token' });
    });
  });
});
