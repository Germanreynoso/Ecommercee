"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDataSource = exports.PostgresDataSourceConfig = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const config_1 = require("@nestjs/config");
dotenv.config({
    path: '.env',
});
const PostgresDataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migration/*{ts,.js}'],
};
exports.PostgresDataSourceConfig = (0, config_1.registerAs)('postgres', () => PostgresDataSourceOptions);
exports.PostgresDataSource = new typeorm_1.DataSource(PostgresDataSourceOptions);
//# sourceMappingURL=data-source.js.map