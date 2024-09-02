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
exports.OrdersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const auth_guard_1 = require("../guard/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async create(createOrderDto) {
        try {
            return await this.ordersService.create(createOrderDto);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create order', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            return await this.ordersService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch orders', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const order = await this.ordersService.findOne(id);
            if (!order) {
                throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
            }
            return order;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch order', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateOrderDto) {
        try {
            const updatedOrder = await this.ordersService.update(id, updateOrderDto);
            if (!updatedOrder) {
                throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
            }
            return updatedOrder;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to update order', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const result = await this.ordersService.remove(id);
            if (!result) {
                throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
            }
            return { message: `Order with id ${id} has been removed.` };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to remove order', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new order' }),
    (0, swagger_1.ApiBody)({ type: create_order_dto_1.CreateOrderDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: require("./dto/response-order.dto").OrderResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all orders' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all orders retrieved.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("./entities/order.entity").Order] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get an order by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order successfully retrieved.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("../order-details/entities/order-detail.entity").OrderDetail] }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update an order by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'Order ID' }),
    (0, swagger_1.ApiBody)({ type: update_order_dto_1.UpdateOrderDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("../order-details/entities/order-detail.entity").OrderDetail] }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an order by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order successfully removed.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error.' }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map