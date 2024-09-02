import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ImageUploadPipe implements PipeTransform {
    private readonly allowedMimeTypes;
    private readonly maxSizeInBytes;
    transform(value: any, metadata: ArgumentMetadata): any;
}
