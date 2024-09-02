import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Test31724365368481 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
