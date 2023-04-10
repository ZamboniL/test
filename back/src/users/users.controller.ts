import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './model/create-user-dto';
import { TypeOrmFilter } from '../common/filters/typeorm.filter';
import { User } from './model/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/model/auth-user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(TypeOrmFilter)
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete()
  @UseFilters(TypeOrmFilter)
  @UseGuards(AuthGuard)
  delete(@Request() req: Request & { user: AuthUser }) {
    return this.usersService.delete(req.user.sub);
  }
}
