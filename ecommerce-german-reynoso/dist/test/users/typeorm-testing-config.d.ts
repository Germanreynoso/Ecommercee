import { TypeOrmModuleOptions } from "@nestjs/typeorm";
export declare const typeOrmTestConfig: TypeOrmModuleOptions;
export declare const TypeOrmTestModule: import("@nestjs/common").DynamicModule;
export declare const sqliteDataSourceConfig: (() => {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/sqlite/SqliteConnectionOptions").SqliteConnectionOptions>) & import("@nestjs/config").ConfigFactoryKeyHost<{
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    manualInitialization?: boolean;
} & Partial<import("typeorm/driver/sqlite/SqliteConnectionOptions").SqliteConnectionOptions>>;
