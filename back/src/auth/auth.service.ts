import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!(await this.validatePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id };

    return { token: await this.jwtService.signAsync(payload) };
  }

  private async validatePassword(
    signInPassword: string,
    userPassword: string
  ): Promise<boolean> {
    const isPasswordMatching = await compare(signInPassword, userPassword);
    return isPasswordMatching;
  }
}
