import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { CreateUserDto } from './model/create-user-dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should return a user without the password', async () => {
      const user: CreateUserDto = {
        email: 'test@gmail.com',
        name: 'Test',
        password: '123456'
      };

      const expected = User.construct({ email: user.email, name: user.name });

      jest
        .spyOn(repository, 'save')
        .mockImplementationOnce(async () => User.construct(user));

      const result = await service.create(user);

      expect(repository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(expected);
    });
  });

  describe('delete', () => {
    it('should return a user without the password', async () => {
      const user = {
        id: 1,
        email: 'test@gmail.com',
        name: 'Test',
        password: '123456'
      };

      const expected = User.construct({
        id: user.id,
        email: user.email,
        name: user.name
      });

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementationOnce(async () => expected);

      jest
        .spyOn(repository, 'remove')
        .mockImplementationOnce(async () => expected);

      const result = await service.delete(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: user.id });
      expect(repository.remove).toHaveBeenCalledWith(expected);
      expect(result).toEqual(expected);
    });

    it('should throw an error if the user is not found', async () => {
      const id = 2;

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementationOnce(async () => null);

      expect(service.delete(id)).rejects.toThrowError('Invalid credentials');
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const email = 'test@gmail.com';

      const expected = User.construct({
        id: 1,
        email,
        name: 'Test',
        password: 'DHSAU2#$@Q)(j'
      });

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementationOnce(async () => expected);

      const result = await service.findOne(email);

      expect(repository.findOneBy).toHaveBeenCalledWith({ email });
      expect(result).toEqual(expected);
    });

    it('should throw an error if the user is not found', async () => {
      const email = 'test@gmail.com';

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementationOnce(async () => null);

      expect(service.findOne(email)).rejects.toThrowError(
        'Invalid credentials'
      );
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
