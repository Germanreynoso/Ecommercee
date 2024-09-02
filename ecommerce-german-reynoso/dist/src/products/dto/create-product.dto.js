"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, price: { required: true, type: () => Number }, stock: { required: true, type: () => Number } };
    }
}
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map