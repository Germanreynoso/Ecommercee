import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class ImageUploadPipe implements PipeTransform {
  private readonly allowedMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
  ];

  private readonly maxSizeInBytes = 10485760; // 10MB

  transform(value: any, metadata: ArgumentMetadata): any {
    const file = value as Express.Multer.File;

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    if (file.size > this.maxSizeInBytes) {
      throw new BadRequestException('File size exceeds limit');
    }

    return file;
  }
}
