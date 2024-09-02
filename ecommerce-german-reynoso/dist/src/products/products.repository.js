"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
let ProductRepository = class ProductRepository {
    constructor() {
        this.products = [
            {
                id: 1,
                name: 'Laptop',
                description: 'High performance laptop',
                price: 999.99,
                stock: true,
                imgUrl: 'https://example.com/laptop.jpg',
            },
            {
                id: 2,
                name: 'Smartphone',
                description: 'Latest model smartphone',
                price: 499.99,
                stock: true,
                imgUrl: 'https://example.com/smartphone.jpg',
            },
            {
                id: 3,
                name: 'Tablet',
                description: 'Lightweight tablet with great battery life',
                price: 299.99,
                stock: true,
                imgUrl: 'https://example.com/tablet.jpg',
            },
            {
                id: 4,
                name: 'Headphones',
                description: 'Noise-cancelling over-ear headphones',
                price: 89.99,
                stock: true,
                imgUrl: 'https://example.com/headphones.jpg',
            },
            {
                id: 5,
                name: 'Smartwatch',
                description: 'Smartwatch with fitness tracking',
                price: 199.99,
                stock: true,
                imgUrl: 'https://example.com/smartwatch.jpg',
            },
        ];
    }
    findAll() {
        return this.products;
    }
    findOne(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }
    create(product) {
        this.products.push({ ...product, id: Date.now() });
        return product;
    }
    update(id, updateProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        this.products[index] = { ...this.products[index], ...updateProduct };
        return this.products[index];
    }
    remove(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        this.products.splice(index, 1);
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)()
], ProductRepository);
//# sourceMappingURL=products.repository.js.map