import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const Config = new DataSource({
  type: 'postgres',
  host: configService.get('db_host'),
  port: configService.get('db_port'),
  username: configService.get('db_user'),
  password: configService.get('db_password'),
  database: configService.get('db_name'),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['./migrations/*{.ts,.js}']
});
