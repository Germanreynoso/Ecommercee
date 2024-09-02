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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const products_service_1 = require("../products/products.service");
const order_details_service_1 = require("../order-details/order-details.service");
const order_entity_1 = require("./entities/order.entity");
const create_order_detail_dto_1 = require("../order-details/dto/create-order-detail.dto");
const response_order_dto_1 = require("./dto/response-order.dto");
let OrdersService = class OrdersService {
    constructor(orderRepository, userService, productService, orderDetailsService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.productService = productService;
        this.orderDetailsService = orderDetailsService;
    }
    async create(createOrderDto) {
        const { userId, products } = createOrderDto;
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found.`);
        }
        const order = this.orderRepository.create({
            user: user,
            date: new Date(),
        });
        const orderEntity = await this.orderRepository.save(order);
        const total = await this.calculateTotal(products);
        const orderDetail = new create_order_detail_dto_1.CreateOrderDetailDto();
        orderDetail.price = total;
        orderDetail.products = products;
        orderDetail.order = orderEntity;
        const orderDetailEntity = await this.orderDetailsService.create(orderDetail);
        return new response_order_dto_1.OrderResponseDto(orderDetailEntity);
    }
    async calculateTotal(products) {
        let total = 0;
        for (const product of products) {
            total += await this.productService.buyProduct(product.id);
        }
        return total;
    }
    async findAll() {
        return this.orderRepository.find({
            relations: ['user', 'details'],
        });
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['user', 'details'],
        });
        if (!order) {
            throw new Error(`Order with id ${id} not found.`);
        }
        const orderDetail = await this.orderDetailsService.findOneByOrderId(order.id, ['products', 'order']);
        return orderDetail;
    }
    async update(id, updateOrderDto) {
        const result = await this.orderRepository.update(id, updateOrderDto);
        if (result.affected === 0) {
            throw new Error(`Order with id ${id} not found.`);
        }
        const updatedOrder = await this.findOne(id);
        return updatedOrder;
    }
    async remove(id) {
        const order = await this.findOne(id);
        if (order) {
            await this.orderDetailsService.removeByOrderId(id);
            await this.orderRepository.delete(id);
            return { message: `Order with id ${id} has been removed.` };
        }
        else {
            throw new Error(`Order with id ${id} not found.`);
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        products_service_1.ProductsService,
        order_details_service_1.OrderDetailsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map