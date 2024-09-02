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
exports.OrderDetailsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const order_details_service_1 = require("./order-details.service");
const create_order_detail_dto_1 = require("./dto/create-order-detail.dto");
const update_order_detail_dto_1 = require("./dto/update-order-detail.dto");
const swagger_1 = require("@nestjs/swagger");
let OrderDetailsController = class OrderDetailsController {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }
    create(createOrderDetailDto) {
        return this.orderDetailsService.create(createOrderDetailDto);
    }
    findAll() {
        return this.orderDetailsService.findAll();
    }
    findOne(id) {
        return this.orderDetailsService.findOne(id);
    }
    update(id, updateOrderDetailDto) {
        return this.orderDetailsService.update(id, updateOrderDetailDto);
    }
    remove(id) {
        return this.orderDetailsService.remove(id);
    }
};
exports.OrderDetailsController = OrderDetailsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new order detail' }),
    (0, swagger_1.ApiBody)({ type: create_order_detail_dto_1.CreateOrderDetailDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Order detail successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    openapi.ApiResponse({ status: 201, type: require("./entities/order-detail.entity").OrderDetail }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_detail_dto_1.CreateOrderDetailDto]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all order details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all order details retrieved.' }),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an order detail by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'Order detail ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order detail successfully retrieved.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order detail not found.' }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an order detail by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'Order detail ID' }),
    (0, swagger_1.ApiBody)({ type: update_order_detail_dto_1.UpdateOrderDetailDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order detail successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order detail not found.' }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_detail_dto_1.UpdateOrderDetailDto]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an order detail by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'Order detail ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order detail successfully removed.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order detail not found.' }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderDetailsController.prototype, "remove", null);
exports.OrderDetailsController = OrderDetailsController = __decorate([
    (0, swagger_1.ApiTags)('order-details'),
    (0, common_1.Controller)('order-details'),
    __metadata("design:paramtypes", [order_details_service_1.OrderDetailsService])
], OrderDetailsController);
//# sourceMappingURL=order-details.controller.js.map