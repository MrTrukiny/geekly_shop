import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db/data/geekly_shop.sqlite',
  synchronize: true,
  logging: true,
  entities: [],
  migrations: [],
  subscribers: [],
});
