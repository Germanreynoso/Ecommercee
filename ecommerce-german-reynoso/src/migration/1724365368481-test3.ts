import { MigrationInterface, QueryRunner } from "typeorm";

export class Test31724365368481 implements MigrationInterface {
    name = 'Test31724365368481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cit"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countri"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "city" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "countri" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cit" character varying`);
    }

}
