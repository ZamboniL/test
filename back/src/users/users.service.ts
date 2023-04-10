import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDto } from './model/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    user.password = await this.saltPassword(user.password);

    const createdUser = await this.userRepository.save(user);
    createdUser.password = undefined;

    return createdUser;
  }

  async delete(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const deletedUser = await this.userRepository.remove(user);
    deletedUser.password = undefined;

    return deletedUser;
  }

  private async saltPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}
