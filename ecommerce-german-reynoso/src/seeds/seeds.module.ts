 import { Module } from '@nestjs/common';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { Category } from '../categories/entities/category.entity';
 import { Product } from '../products/entities/product.entity';
 import { CategoriesSeeds } from './categories/categories.seeds';
 import { ProductSeed } from './products/products-seeds';
 


 @Module({
   imports:[TypeOrmModule.forFeature([Category, Product])],
   providers: [CategoriesSeeds, ProductSeed],
   exports: [CategoriesSeeds, ProductSeed]
 })
 export class SeedsModule {}
