import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  upload(@Body() file: UploadFileDto) {
    return this.fileUploadService.uploadFile(file);
  }

  @Post()
  create(@Body() createFileUploadDto: CreateFileUploadDto) {
    return this.fileUploadService.create(createFileUploadDto);
  }

  @Get()
  findAll() {
    return this.fileUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploadService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileUploadDto: CreateFileUploadDto) {
    return this.fileUploadService.update(id, updateFileUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileUploadService.remove(id);
  }
}
