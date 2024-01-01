import 'reflect-metadata';
import { AppDataSource } from './data-source';

export const Database = AppDataSource.initialize()
  .then((connection) => console.log(`Connected to ${connection.options.database} database`))
  .catch((error) => console.error(error));
