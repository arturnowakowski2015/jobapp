import { DataSource } from 'typeorm';
import { sqliteDataSource } from './datasource';

export const seedsDataSource = new DataSource({
  ...sqliteDataSource.options,
  migrations: ['dist/db/seeds/*.js'],
});
