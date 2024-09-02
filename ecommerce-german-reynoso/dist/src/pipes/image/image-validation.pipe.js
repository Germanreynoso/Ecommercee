"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
let ImageValidationPipe = class ImageValidationPipe {
    constructor() {
        this.allowedExtensions = ['.jpg', '.jpeg', '.png'];
        this.maxSize = 200 * 1024;
    }
    transform(file) {
        if (!this.isValidExtension(file.originalname)) {
            throw new common_1.BadRequestException('Invalid file type');
        }
        if (file.size > this.maxSize) {
            throw new common_1.BadRequestException('File size exceeds limit');
        }
        return file;
    }
    isValidExtension(filename) {
        const ext = (0, path_1.extname)(filename).toLowerCase();
        return this.allowedExtensions.includes(ext);
    }
};
exports.ImageValidationPipe = ImageValidationPipe;
exports.ImageValidationPipe = ImageValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ImageValidationPipe);
//# sourceMappingURL=image-validation.pipe.js.map