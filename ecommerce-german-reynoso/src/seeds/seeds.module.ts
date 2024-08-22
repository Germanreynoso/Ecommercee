 import { Module } from '@nestjs/common';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { Category } from 'src/categories/entities/category.entity';
 import { Product } from 'src/products/entities/product.entity';
 import { CategoriesSeeds } from './categories/categories.seeds';
 import { ProductSeed } from './products/products-seeds';
 


 @Module({
   imports:[TypeOrmModule.forFeature([Category, Product])],
   providers: [CategoriesSeeds, ProductSeed],
   exports: [CategoriesSeeds, ProductSeed]
 })
 export class SeedsModule {}
