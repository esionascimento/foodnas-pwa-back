import { DataSource } from "typeorm";
import { Users } from './Entities/Users';
import { DB_HOST, DB_PORT, DB_PASSWORD, DB_USERNAME, DB_DATABASE } from './config';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [Users],
  subscribers: [],
  migrations: [],
  ssl: false
})
