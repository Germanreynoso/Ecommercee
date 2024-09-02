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
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../service/cloudinary/cloudinary.service");
let FileUploadService = class FileUploadService {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
        this.files = new Map();
    }
    async uploadFile(file) {
        const url = await this.cloudinaryService.uploadFile(file.buffer, file.originalname);
        return { url };
    }
    async create(createFileUploadDto) {
        const id = Date.now().toString();
        this.files.set(id, createFileUploadDto);
        return { id, ...createFileUploadDto };
    }
    async findAll() {
        return Array.from(this.files.values());
    }
    async findOne(id) {
        const file = this.files.get(id);
        if (!file) {
            throw new common_1.NotFoundException(`File with id ${id} not found`);
        }
        return file;
    }
    async update(id, updateFileUploadDto) {
        const existingFile = this.files.get(id);
        if (!existingFile) {
            throw new common_1.NotFoundException(`File with id ${id} not found`);
        }
        const updatedFile = { ...existingFile, ...updateFileUploadDto };
        this.files.set(id, updatedFile);
        return updatedFile;
    }
    async remove(id) {
        const result = this.files.delete(id);
        if (!result) {
            throw new common_1.NotFoundException(`File with id ${id} not found`);
        }
    }
    async uploadImage(id, file) {
        const fileDto = {
            fieldname: file.fieldname,
            buffer: file.buffer,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
        };
        const url = await this.uploadFile(fileDto);
        return { url: url.url };
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map