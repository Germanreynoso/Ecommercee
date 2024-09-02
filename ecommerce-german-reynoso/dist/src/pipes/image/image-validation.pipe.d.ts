import { PipeTransform } from '@nestjs/common';
export declare class ImageValidationPipe implements PipeTransform {
    readonly allowedExtensions: string[];
    readonly maxSize: number;
    transform(file: Express.Multer.File): Express.Multer.File;
    private isValidExtension;
}
