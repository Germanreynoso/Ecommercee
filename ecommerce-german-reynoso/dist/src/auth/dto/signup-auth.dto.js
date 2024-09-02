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
exports.SignUpAuthDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const roles_enum_1 = require("../roles.enum");
class SignUpAuthDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, email: { required: true, type: () => String }, password: { required: true, type: () => String, pattern: "/^(?!.*(.)\\1{2})(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_])(?!.*\\s).{8,15}$/" }, passwordConfirm: { required: true, type: () => String }, address: { required: true, type: () => String }, phone: { required: true, type: () => String }, country: { required: false, type: () => String }, city: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, role: { required: false, enum: require("../roles.enum").Role } };
    }
}
exports.SignUpAuthDto = SignUpAuthDto;
__decorate([
    (0, class_validator_1.MaxLength)(80),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpAuthDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignUpAuthDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^(?!.*(.)\1{2})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,15}$/, {
        message: 'Password is too weak. It must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, one special character, no spaces, and no more than two consecutive identical characters.',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpAuthDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpAuthDto.prototype, "passwordConfirm", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpAuthDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpAuthDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUpAuthDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUpAuthDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], SignUpAuthDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SignUpAuthDto.prototype, "role", void 0);
//# sourceMappingURL=signup-auth.dto.js.map