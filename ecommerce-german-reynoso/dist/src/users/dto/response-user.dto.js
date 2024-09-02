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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResponseDTO = exports.OrderDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class OrderDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, date: { required: true, type: () => Date } };
    }
}
exports.OrderDTO = OrderDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The id of the order',
        required: true,
    }),
    __metadata("design:type", String)
], OrderDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The date of the order',
        required: true,
    }),
    __metadata("design:type", Date)
], OrderDTO.prototype, "date", void 0);
class userResponseDTO {
    constructor(partial) {
        this.id = partial.id;
        this.name = partial.name;
        this.email = partial.email;
        this.address = partial.address;
        this.phone = partial.phone;
        this.country = partial.country;
        this.city = partial.city;
        this.orders = partial.orders ?? [];
        this.role = partial.role;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, address: { required: true, type: () => String }, phone: { required: true, type: () => String }, country: { required: true, type: () => String }, city: { required: false, type: () => String }, orders: { required: true, type: () => [require("./response-user.dto").OrderDTO] }, role: { required: true, type: () => String } };
    }
}
exports.userResponseDTO = userResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The uuid of the user, assigned by the database',
        required: true,
    }),
    __metadata("design:type", String)
], userResponseDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The name of the user',
        required: true,
    }),
    __metadata("design:type", String)
], userResponseDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The email of the user',
        required: true,
    }),
    __metadata("design:type", String)
], userResponseDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The address of the user',
        required: true,
    }),
    __metadata("design:type", String)
], userResponseDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The phone of the user',
        required: true,
    }),
    __metadata("design:type", String)
], userResponseDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The country of the user',
        required: false,
    }),
    __metadata("design:type", String)
], userResponseDTO.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The city of the user',
        required: false,
    }),
    __metadata("design:type", String)
], userResponseDTO.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [OrderDTO],
        description: 'The list of orders associated with the user',
        required: false,
    }),
    __metadata("design:type", Array)
], userResponseDTO.prototype, "orders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The role of the user',
        required: true,
    }),
    __metadata("design:type", String)
], userResponseDTO.prototype, "role", void 0);
//# sourceMappingURL=response-user.dto.js.map