import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll(page: number, limit: number): Promise<Product[]> {
    return await this.productRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    console.log('updateProductDto', updateProductDto);
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOne({ where: { id } });
    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return updatedProduct;
  }

  async buyProduct(id: number): Promise<number> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.stock === 0) {
      throw new Error('Out of stock');
    }
    await this.productRepository.update(id, {
      stock: product.stock - 1,
    });
    console.log('Product bought successfully');
    return product.price;
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
