import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { registerAs } from "@nestjs/config";

export const typeOrmTestConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: ':memory',
    entities: [__dirname + '/../**/*.entity{ts,.js}'],
    synchronize: true,
};
export const TypeOrmTestModule = TypeOrmModule.forRoot(typeOrmTestConfig);
export const sqliteDataSourceConfig = registerAs(
    'sqlite',
    () => typeOrmTestConfig,
)