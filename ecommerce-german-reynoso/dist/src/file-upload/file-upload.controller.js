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
exports.FileUploadController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const file_upload_service_1 = require("./file-upload.service");
const create_file_upload_dto_1 = require("./dto/create-file-upload.dto");
const platform_express_1 = require("@nestjs/platform-express");
const validation_pipes_1 = require("../pipes/validation.pipes");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
let FileUploadController = class FileUploadController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async uploadImage(id, file) {
        return this.fileUploadService.uploadImage(id, file);
    }
    async create(createFileUploadDto) {
        return this.fileUploadService.create(createFileUploadDto);
    }
    findAll() {
        return this.fileUploadService.findAll();
    }
    async findOne(id) {
        return this.fileUploadService.findOne(id);
    }
    async update(id, updateFileUploadDto) {
        return this.fileUploadService.update(id, updateFileUploadDto);
    }
    async remove(id) {
        return this.fileUploadService.remove(id);
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, common_1.Post)('uploadImage/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload an image for a given ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID of the entity to associate the image with' }),
    (0, swagger_1.ApiBody)({ type: 'multipart/form-data', description: 'Image file to upload' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Image successfully uploaded.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new file upload record' }),
    (0, swagger_1.ApiBody)({ type: create_file_upload_dto_1.CreateFileUploadDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'File upload record successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request.' }),
    (0, common_2.UsePipes)(new validation_pipes_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_file_upload_dto_1.CreateFileUploadDto]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all file upload records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all file upload records retrieved.' }),
    openapi.ApiResponse({ status: 200, type: [require("./dto/create-file-upload.dto").CreateFileUploadDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FileUploadController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a file upload record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'File upload record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File upload record successfully retrieved.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'File upload record not found.' }),
    openapi.ApiResponse({ status: 200, type: require("./dto/create-file-upload.dto").CreateFileUploadDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a file upload record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'File upload record ID' }),
    (0, swagger_1.ApiBody)({ type: create_file_upload_dto_1.CreateFileUploadDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File upload record successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'File upload record not found.' }),
    (0, common_2.UsePipes)(new validation_pipes_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_file_upload_dto_1.CreateFileUploadDto]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a file upload record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'File upload record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File upload record successfully removed.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'File upload record not found.' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "remove", null);
exports.FileUploadController = FileUploadController = __decorate([
    (0, swagger_1.ApiTags)('file-upload'),
    (0, common_1.Controller)('file-upload'),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileUploadController);
//# sourceMappingURL=file-upload.controller.js.map