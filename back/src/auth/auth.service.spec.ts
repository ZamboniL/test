import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hashSync } from 'bcrypt';
import { User } from '../users/model/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useClass: class Stub {
            signAsync = jest.fn();
          }
        },
        {
          provide: UsersService,
          useClass: class Stub {
            findOne = jest.fn();
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return a token', async () => {
      const email = 'test@gmail.com';
      const password = '123456';
      const encryptedPassword = hashSync(password, 10);

      jest.spyOn(usersService, 'findOne').mockImplementationOnce(async () =>
        User.construct({
          id: 1,
          email,
          password: encryptedPassword
        })
      );

      jest
        .spyOn(jwtService, 'signAsync')
        .mockImplementationOnce(async () => 'token');

      const result = await service.signIn(email, password);

      expect(usersService.findOne).toHaveBeenCalledWith(email);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        username: email,
        sub: 1
      });
      expect(result).toEqual({ token: 'token' });
    });

    it('should throw an error if the password is incorrect', async () => {
      const email = 'test@gmail.com';
      const password = '123456';
      const encryptedPassword = hashSync('sdadas', 10);

      jest.spyOn(usersService, 'findOne').mockImplementationOnce(async () =>
        User.construct({
          id: 1,
          email,
          password: encryptedPassword
        })
      );

      expect(jwtService.signAsync).not.toHaveBeenCalled();
      await expect(service.signIn(email, password)).rejects.toThrow(
        'Invalid credentials'
      );
    });
  });
});
