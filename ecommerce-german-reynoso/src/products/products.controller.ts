import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    return this.productsService.findAll(Number(page), Number(limit));
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id)); // Convierte id a número
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(Number(id), updateProductDto); // Convierte id a número
  }

 
@Delete(':id')
remove(@Param('id') id: string) {
  return this.productsService.remove(Number(id)); // Convierte id a número
}
}
