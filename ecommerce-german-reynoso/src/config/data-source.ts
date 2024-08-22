// import { DataSource, DataSourceOptions } from 'typeorm';
// import * as dotenv from 'dotenv';
// import { registerAs } from '@nestjs/config';

// dotenv.config({
//   path: '.env',
// });

// const PostgresDataSource: DataSourceOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: true,
//   logging: false,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/migration/*{ts,.js}'],
// };

// export const PostgresDataSourceConfig = registerAs('postgres', () => PostgresDataSource);
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';
import { Order } from '../orders/entities/order.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';

dotenv.config({
  path: '.env',
});

const PostgresDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [Order, OrderDetail, Product, User, Category],
  migrations: ['dist/migration/*{.ts,.js}'],
};

// Exporta una instancia de DataSource para usar con TypeORM CLI
export const PostgresDataSource = new DataSource(PostgresDataSourceOptions);

// Exporta la configuración para usar con ConfigModule
export const PostgresDataSourceConfig = registerAs('postgres', () => PostgresDataSourceOptions);
