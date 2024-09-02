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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const response_user_dto_1 = require("./dto/response-user.dto");
const auth_guard_1 = require("../guard/auth.guard");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_3 = require("@nestjs/common");
const date_adder_interceptors_1 = require("../interceptors/date-adder.interceptors");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto, request) {
        const user = { ...createUserDto, createdAt: request.date };
        return this.usersService.create(user);
    }
    async findOne(id) {
        const user = await this.usersService.findOne(id);
        return new response_user_dto_1.userResponseDTO(user);
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.usersService.update(id, updateUserDto);
        return new response_user_dto_1.userResponseDTO(updatedUser);
    }
    async remove(id) {
        const result = await this.usersService.remove(id);
        if (!result) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { message: `User with id ${id} has been removed.` };
    }
    async findAll(page, limit) {
        const users = await this.usersService.findAll(page, limit);
        return users.map(user => new response_user_dto_1.userResponseDTO(user));
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)(date_adder_interceptors_1.DateAdderInterceptor),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: require("./entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_3.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/response-user.dto").userResponseDTO }),
    __param(0, (0, common_1.Param)('id', new common_2.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/response-user.dto").userResponseDTO }),
    __param(0, (0, common_1.Param)('id', new common_2.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('id', new common_2.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("./dto/response-user.dto").userResponseDTO] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map