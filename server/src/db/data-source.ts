import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { entities } from './entities';

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  // Use LiteFS if running in production, otherwise use local file system
  database: isProduction ? '/litefs/geekly_shop.sqlite' : './src/db/data/geekly_shop.sqlite',
  synchronize: true, // TODO: Disable in production because it drops the database
  logging: false,
  entities: [...entities],
  migrations: [isProduction ? './db/migrations/*/**.js' : './src/db/migrations/**/*.ts'],
  subscribers: [],
});
