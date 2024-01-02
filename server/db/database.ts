import 'reflect-metadata';
import { AppDataSource } from './data-source';

export const Database = AppDataSource.initialize()
  .then(async (connection) => {
    console.info(`Connected to ${connection.options.database} database`);

    // TODO: Disable in production, migrations should be run manually directly from dist folder

    console.info('Running migrations...');
    await connection.runMigrations();
    console.info('Migrations executed successfully');

    return connection;
  })
  .catch((error) => console.error(error));
