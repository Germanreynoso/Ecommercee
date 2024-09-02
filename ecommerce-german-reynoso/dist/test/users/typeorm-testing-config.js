"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqliteDataSourceConfig = exports.TypeOrmTestModule = exports.typeOrmTestConfig = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
exports.typeOrmTestConfig = {
    type: 'sqlite',
    database: ':memory',
    entities: [__dirname + '/../**/*.entity{ts,.js}'],
    synchronize: true,
};
exports.TypeOrmTestModule = typeorm_1.TypeOrmModule.forRoot(exports.typeOrmTestConfig);
exports.sqliteDataSourceConfig = (0, config_1.registerAs)('sqlite', () => exports.typeOrmTestConfig);
//# sourceMappingURL=typeorm-testing-config.js.map