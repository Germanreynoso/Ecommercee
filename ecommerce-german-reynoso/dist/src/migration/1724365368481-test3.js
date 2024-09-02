"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test31724365368481 = void 0;
class Test31724365368481 {
    constructor() {
        this.name = 'Test31724365368481';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cit"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countri"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "city" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "countri" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cit" character varying`);
    }
}
exports.Test31724365368481 = Test31724365368481;
//# sourceMappingURL=1724365368481-test3.js.map