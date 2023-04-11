import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './model/create-user.dto';
import { User } from './model/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/model/auth-user';
describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useClass: Repository },
        { provide: JwtService, useClass: class Stub {} }
      ]
    })
      .overrideGuard(AuthGuard)
      .useClass(
        class Stub {
          canActivate = jest.fn();
        }
      )
      .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@gmail.com',
        password: '123456',
        name: 'Lucas'
      };

      const expected = User.construct(createUserDto);
      jest
        .spyOn(usersService, 'create')
        .mockImplementationOnce(async () => expected);

      const result = await controller.create(createUserDto);

      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(expected);
    });
  });

  describe('delete', () => {
    it('should return a user', async () => {
      const user = {
        id: 1,
        email: ''
      };

      const expected = User.construct(user);

      jest
        .spyOn(usersService, 'delete')
        .mockImplementationOnce(async () => expected);

      const req = {
        user: { username: 'test', sub: 1, exp: 1, iat: 1 }
      } as Request & { user: AuthUser };

      const result = await controller.delete(req);

      expect(usersService.delete).toHaveBeenCalledWith(req.user.sub);
      expect(result).toEqual(expected);
    });
  });
});
