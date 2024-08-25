import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21724315310907 implements MigrationInterface {
    name = 'Test21724315310907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phon"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countr"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "countri" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countri"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "countr" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phon" character varying NOT NULL`);
    }

}
