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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, email: { required: true, type: () => String }, password: { required: true, type: () => String, pattern: "/^(?!.*(.)\\1{2})(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])(?!.*\\s).{8,15}$/" }, address: { required: true, type: () => String }, phone: { required: true, type: () => String }, country: { required: false, type: () => String }, city: { required: false, type: () => String }, createdAt: { required: false, type: () => Date } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The Name Of the user',
        required: true,
    }),
    (0, class_validator_1.MaxLength)(80),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The email of the user',
        required: true,
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The password of the user',
        required: true,
    }),
    (0, class_validator_1.Matches)(/^(?!.*(.)\1{2})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,15}$/, {
        message: 'Password is too weak. It must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, one special character, no spaces, and no more than two consecutive identical characters.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The address of the user',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The phone of the user',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The country number of the user',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The city of the user',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'The At of the user',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "createdAt", void 0);
//# sourceMappingURL=create-user.dto.js.map