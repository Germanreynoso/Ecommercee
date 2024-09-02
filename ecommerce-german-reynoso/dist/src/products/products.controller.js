"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const platform_express_1 = require("@nestjs/platform-express");
const image_upload_pipe_1 = require("../pipes/image/image-upload/image-upload.pipe");
const auth_guard_1 = require("../guard/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    findAll(page = 1, limit = 10) {
        return this.productsService.findAll(page, limit);
    }
    async findOne(id) {
        const product = await this.productsService.findOne(id);
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.productsService.findOne(id);
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedProduct = await this.productsService.update(id, updateProductDto);
        return updatedProduct;
    }
    async remove(id) {
        const product = await this.productsService.findOne(id);
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.productsService.remove(id);
        return { message: `Product with id ${id} has been removed.` };
    }
    async uploadFile(id, file) {
        return this.productsService.uploadFile(file, id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiBody)({ type: create_product_dto_1.CreateProductDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    openapi.ApiResponse({ status: 201, type: require("./entities/product.entity").Product }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number for pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of items per page' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all products retrieved.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/product.entity").Product] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Get a product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product successfully retrieved.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/product.entity").Product }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'Product ID' }),
    (0, swagger_1.ApiBody)({ type: update_product_dto_1.UpdateProductDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    openapi.ApiResponse({ status: 200, type: require("./entities/product.entity").Product }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product successfully removed.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/upload'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a file for a product' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File successfully uploaded.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new image_upload_pipe_1.ImageUploadPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "uploadFile", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map