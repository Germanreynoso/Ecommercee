"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test21724315310907 = void 0;
class Test21724315310907 {
    constructor() {
        this.name = 'Test21724315310907';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phon"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countr"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "countri" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countri"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "countr" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phon" character varying NOT NULL`);
    }
}
exports.Test21724315310907 = Test21724315310907;
//# sourceMappingURL=1724315310907-test2.js.map