import { Controller, Post, Body, Param, UploadedFile, UseInterceptors, Get, Patch, Delete } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image/image-validation.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipes';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UsePipes } from '@nestjs/common';

@ApiTags('file-upload')
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @ApiOperation({ summary: 'Upload an image for a given ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID of the entity to associate the image with' })
  @ApiBody({ type: 'multipart/form-data', description: 'Image file to upload' })
  @ApiResponse({ status: 201, description: 'Image successfully uploaded.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.fileUploadService.uploadImage(id, file);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new file upload record' })
  @ApiBody({ type: CreateFileUploadDto })
  @ApiResponse({ status: 201, description: 'File upload record successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UsePipes(new ValidationPipe())
  async create(@Body() createFileUploadDto: CreateFileUploadDto) {
    return this.fileUploadService.create(createFileUploadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all file upload records' })
  @ApiResponse({ status: 200, description: 'List of all file upload records retrieved.' })
  findAll() {
    return this.fileUploadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a file upload record by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'File upload record ID' })
  @ApiResponse({ status: 200, description: 'File upload record successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'File upload record not found.' })
  async findOne(@Param('id') id: string) {
    return this.fileUploadService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a file upload record by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'File upload record ID' })
  @ApiBody({ type: CreateFileUploadDto })
  @ApiResponse({ status: 200, description: 'File upload record successfully updated.' })
  @ApiResponse({ status: 404, description: 'File upload record not found.' })
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateFileUploadDto: CreateFileUploadDto) {
    return this.fileUploadService.update(id, updateFileUploadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a file upload record by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'File upload record ID' })
  @ApiResponse({ status: 200, description: 'File upload record successfully removed.' })
  @ApiResponse({ status: 404, description: 'File upload record not found.' })
  async remove(@Param('id') id: string) {
    return this.fileUploadService.remove(id);
  }
}
