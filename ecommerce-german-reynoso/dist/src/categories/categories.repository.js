"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const typeorm_1 = require("typeorm");
class CategoriesRepository extends typeorm_1.Repository {
    async getCategories() {
        return this.find();
    }
    async addCategories(categories) {
        return this.save(categories);
    }
    async findCategoryByName(name) {
        return this.findOne({ where: { name } });
    }
}
exports.CategoriesRepository = CategoriesRepository;
//# sourceMappingURL=categories.repository.js.map