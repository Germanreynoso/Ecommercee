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
exports.FileUploadEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let FileUploadEntity = class FileUploadEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, originalname: { required: true, type: () => String }, mimetype: { required: true, type: () => String }, size: { required: true, type: () => Number }, buffer: { required: true, type: () => Object }, createdAt: { required: true, type: () => Date } };
    }
};
exports.FileUploadEntity = FileUploadEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FileUploadEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FileUploadEntity.prototype, "originalname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FileUploadEntity.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], FileUploadEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)('bytea'),
    __metadata("design:type", Buffer)
], FileUploadEntity.prototype, "buffer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FileUploadEntity.prototype, "createdAt", void 0);
exports.FileUploadEntity = FileUploadEntity = __decorate([
    (0, typeorm_1.Entity)('files')
], FileUploadEntity);
//# sourceMappingURL=file-upload.entity.js.map