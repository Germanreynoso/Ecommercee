"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test1724315121985 = void 0;
class Test1724315121985 {
    constructor() {
        this.name = 'Test1724315121985';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "city" TO "cit"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "cit" TO "city"`);
    }
}
exports.Test1724315121985 = Test1724315121985;
//# sourceMappingURL=1724315121985-test.js.map