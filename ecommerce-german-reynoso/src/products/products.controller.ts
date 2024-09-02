import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Put, HttpCode, HttpException, HttpStatus, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadPipe } from '../pipes/image/image-upload/image-upload.pipe';
import { AuthGuard } from '../guard/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all products' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiResponse({ status: 200, description: 'List of all products retrieved.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.productsService.findAll(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product successfully updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const updatedProduct = await this.productsService.update(id, updateProductDto);
    return updatedProduct;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product successfully removed.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    await this.productsService.remove(id);
    return { message: `Product with id ${id} has been removed.` };
  }

  @Post(':id/upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Upload a file for a product' })
  @ApiParam({ name: 'id', type: 'string', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'File successfully uploaded.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile(new ImageUploadPipe()) file: Express.Multer.File,
  ) {
    return this.productsService.uploadFile(file, id);
  }
}
