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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const file_upload_service_1 = require("../file-upload/file-upload.service");
let ProductsService = class ProductsService {
    constructor(productRepository, fileUploadService) {
        this.productRepository = productRepository;
        this.fileUploadService = fileUploadService;
    }
    async create(createProductDto) {
        const newProduct = this.productRepository.create(createProductDto);
        return await this.productRepository.save(newProduct);
    }
    async findAll(page, limit) {
        return await this.productRepository.find({
            take: limit,
            skip: (page - 1) * limit,
        });
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const result = await this.productRepository.update(id, updateProductDto);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return this.productRepository.findOne({ where: { id } });
    }
    async buyProduct(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new Error('Product not found');
        }
        if (product.stock === 0) {
            throw new Error('Out of stock');
        }
        await this.productRepository.update(id, {
            stock: product.stock - 1,
        });
        return product.price;
    }
    async remove(id) {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
    }
    async uploadFile(file, id) {
        const result = await this.fileUploadService.uploadFile(file);
        await this.productRepository.update(id, { imgUrl: result.url });
        return { imgUrl: result.url };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_upload_service_1.FileUploadService])
], ProductsService);
//# sourceMappingURL=products.service.js.map