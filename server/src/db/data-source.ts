import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { entities } from './entities';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/db/data/geekly_shop.sqlite',
  synchronize: true, // TODO: Disable in production because it drops the database
  logging: false,
  entities: [...entities],
  migrations: ['src/db/migrations/**/*.ts'],
  subscribers: [],
});
