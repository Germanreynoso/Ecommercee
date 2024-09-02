import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Test21724315310907 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
