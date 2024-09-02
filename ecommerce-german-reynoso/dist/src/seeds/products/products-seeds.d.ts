import { Category } from "src/categories/entities/category.entity";
import { Product } from "src/products/entities/product.entity";
import { Repository } from "typeorm";
export declare class ProductSeed {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    findCategoryByName(category: string): Promise<Category>;
    seed(): Promise<void>;
}
